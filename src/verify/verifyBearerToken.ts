import {IncomingMessage,ServerResponse} from 'http'
import {Request} from 'express'
import {verifyToken} from '../utils/jwt'
import {respOK,respErr} from '../utils/utils'
import {iUserProfile} from '../db/sql'

const errMsg = 'Not allowed without bearer token as authorization header'

function extractBearerToken(req:IncomingMessage):string|undefined{
  const bearerHeader =  req.headers['authorization']
  if (typeof bearerHeader === "undefined"){
    return undefined
  }
  const bearer = bearerHeader?.split(" ")
  if (bearer){
    let token = bearer[1]
    if (token){
      return token
    }else{
      return undefined
    }
  }else{
    return undefined
  }
}

/**
 * Verify bearer token send in the header of the request.
 * @param token JWT bearer token
 * @param res response object
 * @param next optional
 */
function verifyBearerToken(token:string,res:ServerResponse,returnProfile=false){
  let profile:iUserProfile|undefined
  try{
    profile = verifyToken(token) as iUserProfile
  }catch(e){
    const {name} = e
    if (name==='TokenExpiredError'){
      respErr(res,403,'Token expired, renew it please')
    }else{
      respErr(res,403,'Invalid bearer token')
    }
  }
  if (profile && returnProfile){
    return profile
  }else if (profile){
      respOK(res,{profile, token})
  }else{
    respErr(res,403,'Invalid bearer token')
  }
}

/**
 * Verify user middleware function.
 * @param req request
 * @param res  server response
 * @param next next function middleware
 */
export function verifyUser(req:Request,res:ServerResponse,next:any){
  const token = extractBearerToken(req)
  if (token){
    const profile:any = verifyBearerToken(token,res,true)
    if (profile){
      // we have profile from valid token
      // check if admin role is assigned
      if (profile['roles'].includes("admin")===true){
        next()
      }else{
        respErr(res,403,"Insufficient user rights")
      }
    }
  }else{
    respErr(res,403,errMsg)
  }
}

export default (req:Request,res:ServerResponse)=>{
  const token = extractBearerToken(req)
  if (token){
    verifyBearerToken(token,res)
  } else{
    respErr(res,403,errMsg)
  }
}