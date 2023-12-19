import { getLiveMatches } from "@/api";
import { Card } from "@/components/ui/card";

export default async function MyTeam() {
  const matchData = await getLiveMatches();
  
  return (
    
      <Card className=" p-4 max-w-2xl mx-auto w-full">
        <h2 className="text-xl font-bold text-center">MyTEAM page</h2>
        
       
      </Card>
      
  
  );
}
