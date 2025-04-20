import { NextResponse } from "next/server";
import Together from "together-ai";
const together = new Together({ apiKey: "tgp_v1_XsKOyhMA-Ax5EKmBsYkNbKSStYzDh1WitD6601h6bp8" });
import axios from "axios";

export async function POST(req) {
    try {
        const { prompt } = await req.json();
      

            const response = await together.images.create({
                prompt: prompt,
                model: "black-forest-labs/FLUX.1-schnell-Free",
                steps: 4,
              });
              
              console.log(response.data);

            
        

        return NextResponse.json({ result: response.data[0]?.url });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


 