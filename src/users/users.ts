import {ServerResponse} from 'http'
import {respOK,respErr} from '../utils/utils'
// import {addUser,allUsers,updateUser,iUser} from '../db/sql'
import * as sql from '../db/sql'
import {logInfo} from '../utils/utils'

function extractUserFromBody(req:any){
  const {body} = req
  if (body){
    const newUser:sql.iUser = {
      ...body
    }
    return newUser
  }
}

export function addNewUser(req:any,res:ServerResponse){
  const newUser = extractUserFromBody(req)
  if (newUser){
    sql.addUser(newUser)
      .then(user=>{
        respOK(res,user)
      })
      .catch(e=>{
        logInfo(`addNewUser.sql...ERROR:${e.message}`)
        respErr(res,500,e.message)
      })
  }else{
    respErr(res,400,"Missing body")
  }
}

export function updateUser(req:any,res:ServerResponse){
  const userData = extractUserFromBody(req)
  if (userData && userData['id']){
    sql.updateUser(userData)
      .then(user=>{
        respOK(res,user)
      })
      .catch(e=>{
        logInfo(`updateUser.sql...ERROR:${e.message}`)
        respErr(res,500,e.message)
      })
  }else{
    respErr(res,400,"Missing body")
  }
}

export function deleteUser(req:any,res:ServerResponse){
  const userData = extractUserFromBody(req)
  if (userData && userData['id']){
    sql.deleteUserById(userData.id)
      .then(user=>{
        respOK(res,user)
      })
      .catch(e=>{
        logInfo(`deleteUser.sql...ERROR:${e.message}`)
        respErr(res,500,e.message)
      })
  }else{
    respErr(res,400,"Missing body")
  }
}

export function deleteUserById(req:any,res:ServerResponse){
  const {id} = req.params
  if (id){
    sql.deleteUserById(id)
      .then(user=>{
        respOK(res,user)
      })
      .catch(e=>{
        logInfo(`deleteUserById.sql...ERROR:${e.message}`)
        respErr(res,500,e.message)
      })
  }else{
    respErr(res,400,"Missing body")
  }
}

export function getAllUsers(req:any,res:ServerResponse){
  sql.allUsers()
    .then(users=>{
      respOK(res,users)
    })
    .catch(e=>{
      logInfo(`getAllUsers.sql...ERROR:${e.message}`)
      respErr(res,500,e.message)
    })
}