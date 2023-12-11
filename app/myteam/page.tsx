import { getLiveMatches } from "@/api";

export default async function MyTeam() {
  const matchData = await getLiveMatches();
  
  return (
    
      <div className="bg-white shadow-lg rounded-lg p-4 max-w-2xl mx-auto w-full">
        <h2 className="text-xl font-bold text-center">MyTEAM page</h2>
        
       
      </div>
      
  
  );
}
