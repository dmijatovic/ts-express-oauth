import { ServerResponse } from 'http'
import process from 'process'

function writeHead(res:ServerResponse, status:number){
  res.writeHead(status,{
    'Content-Type': 'application/json',
    'x-server':"express"
  })
}

export function respOK(res:ServerResponse, data:any):void{
  const json = JSON.stringify({
    status:200,
    statusText: "OK",
    payload: data
  })
  writeHead(res,200)
  res.end(json)
}

export function respErr(res:ServerResponse, status:number,errorText:string):void{
  const json = JSON.stringify({
    status,
    statusText: errorText,
    payload: null
  })
  writeHead(res,status)
  res.end(json)
}

export function respServerError(res:ServerResponse):void{
  const json = JSON.stringify({
    status:500,
    statusText: "Server error",
    payload:null
  })
  writeHead(res,500)
  res.end(json)
}

export function logInfo(message:string){
  process.stdout.write(message)
}

export function logError(message:string){
  process.stderr.write(message)
}