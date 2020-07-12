
const homeHtml=`
<style>
  body{
    font-family: 'Roboto', sans-serif;
    line-height: 1.5rem;
  }
  h1{
    padding: 1rem;
    color: darkblue;
  }
  section{
    padding: 1rem;
  }
</style>
<h1>Welcome to Express auth server</h1>
<section>
  <p>This authentication server should be the lightest express auth sever
  on the world :-). Why?
  </p><p>
  Because it has smallest footprint and runs in the
  smallest Docker container possible. The assumption is that
  this approach should deliver the fastest auth server.
  </p>
</section>
`

export default (req:any,res:any)=>{
  res.end(homeHtml)
}