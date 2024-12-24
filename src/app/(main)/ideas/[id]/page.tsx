export default async function IdeasDetailsPage({params}:{ params: Promise<{ id: string }> }) {

  const id = (await params).id;
    return (
        <div>
          <h1>idea details page id:{id}</h1>
        </div>
    )
}
