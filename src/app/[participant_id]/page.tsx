
export const dynamic = 'force-dynamic'

export default async function Page({ params }: { params: { participant_id: string } }) {
    
    return (
        <>
            <div className="container mx-auto py-10">
                <div className='flex justify-between'>
                    <h1 className="text-2xl font-semibold tracking-tight">Welcome to the Survey {params.participant_id}</h1>
                    
                </div>
            </div>
        </>
    )
  }