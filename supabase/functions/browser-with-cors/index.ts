// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.
import { ChatOpenAI } from "@langchain/openai/";
import { corsHeaders } from '../_shared/cors.ts'
import { OpenAIEmbeddings } from "@langchain/openai/";
import { SupabaseHybridSearch } from "@langchain/community/retrievers/supabase";
import { createClient } from "@supabase/supabase-js";
import { StringOutputParser } from "@langchain/core/output_parsers";
import {
  RunnableSequence,
  RunnablePassthrough,
} from "@langchain/core/runnables/";

import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "@langchain/core/prompts";
import { formatDocumentsAsString } from "langchain/util/document/";



// Optional, but recommended: run on the edge runtime.
// See https://vercel.com/docs/concepts/functions/edge-functions
export const runtime = 'edge';

console.log(`Function "browser-with-cors" up and running!`)

Deno.serve(async (req) => {

  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {

     const llm = new ChatOpenAI({
      openAIApiKey: Deno.env.get('OPENAI_API_KEY'),
      modelName: 'gpt-3.5-turbo',
      temperature: 0.9,
    })

    const client = createClient(
      Deno.env.get('NEXT_PUBLIC_SUPABASE_URL')!,
      Deno.env.get('NEXT_PUBLIC_SUPABASE_ANON_KEY')!
    );

    const query  = await req.json();
    console.log("messages" + query);
    // Request the OpenAI API for the response based on the prompt


    const retriever = new SupabaseHybridSearch(new OpenAIEmbeddings(), {
      client: client,
      //  Below are the defaults, expecting that you set up your supabase table and functions according to the guide above. Please change if necessary.
      similarityK: 2,
      keywordK: 2,
      tableName: "documents",
      similarityQueryName: "match_documents",
      keywordQueryName: "kw_match_documents",
    });

    const SYSTEM_TEMPLATE = `Use the following pieces of context to answer the question at the end.
    If you don't know the answer, just say that you don't know, don't try to make up an answer.
    ----------------
    {context}`;

    const messages = [
      SystemMessagePromptTemplate.fromTemplate(SYSTEM_TEMPLATE),
      HumanMessagePromptTemplate.fromTemplate("{question}"),
    ];
    const prompt = ChatPromptTemplate.fromMessages(messages);
    const chain = RunnableSequence.from([
      {
        context: retriever.pipe(formatDocumentsAsString),
        question: new RunnablePassthrough(),
      },
      prompt,
      llm,
      new StringOutputParser(),
    ]);

    const answer = await chain.invoke(query.query);

    // Return the final answer as a JSON response
    return new Response(JSON.stringify(answer), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })


  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/browser-with-cors' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24ifQ.625_WdcF3KHqz5amU0x2X5WWHP-OEs_4qj0ssLNHzTs' \
//   --header 'Content-Type: application/json' \
//   --data '{"query":"Functions"}'
