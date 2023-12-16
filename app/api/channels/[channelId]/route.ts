import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { channel } from "diagnostics_channel";
import { NextResponse } from "next/server";

export async function DELETE(
    req:Request,
    {params}:{params:{channelId:string}}
){
    try{
        const profile = await currentProfile();
        const {searchParams} = new URL(req.url);


        const serverId =  searchParams.get("serverId");

        if(!profile){
            return new NextResponse("Unauthorized", {status:401});
        }

        if(!serverId){
            return new NextResponse("ServerId Missing", {status:400});
        }

        if(!params.channelId){
            return new NextResponse("ChannelId Missing", {status:400});
        }

        const server = await db.server.
    }catch(err){
        console.log("[CHANNEL_DELETE_ID", err);
        return new NextResponse("Internal Error", {status:500});
    }
}