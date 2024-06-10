import { NextRequest, NextResponse } from "next/server";
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

import { createClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";


export const runtime = "edge";


export async function POST(request: Request) {


  const data = request.formData()

  const file: File | null = (await data).get('file') as unknown as File
  if (!file) {
    return NextResponse.json({message: 'Missing file input', success: false})
  }


  const loader = new WebPDFLoader(file);
  const docs = await loader.load();

  console.log(docs);

// //   const textSplitter = new RecursiveCharacterTextSplitter({
// //     chunkSize: 1000,
// //     chunkOverlap: 100,
// //   })

// //   const splitDocs = await textSplitter.createDocuments(fileContent.split('\n'))

// //   const embeddings = new OpenAIEmbeddings({
// //     openAIApiKey: process.env.OPENAI_API_KEY,
// //   })


  try {

    const client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 2000,
        chunkOverlap: 500,
      });

    const splitDocs = await textSplitter.splitDocuments(docs);

    console.log({ splitDocs });

    const vectorstore = await SupabaseVectorStore.fromDocuments(
      splitDocs,
      new OpenAIEmbeddings(),
      {
        client,
        tableName: "documents",
        queryName: "match_documents",
      }
    );

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}