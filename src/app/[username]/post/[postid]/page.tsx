
export default function Post({params}: {params: {username: string, postid: string}}) {
  return (
    <div>Post {params.username} {params.postid}</div>
  )
}
