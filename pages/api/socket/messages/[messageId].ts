import { currentProfilePages } from "@/lib/current-profile-pages";
import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";

export default async function handler(
    req:NextApiRequest,
    res:NextApiResponseServerIo
) {
    if(req.method !== "DELETE" && req.method !== "PATCH"){
        return res.status(405).json({error:"Method not allowed"});
    }

    try{
        const profile = await currentProfilePages(req);
        const {messageId, serverId, channelId} = req.query;
        const {content} = req.body;

        if(!profile){
            return res.status(401).json({error:"Unauthorized"});
        }

        if(!serverId){
            return res.status(400).json({error:"Server ID missing"})
        }

        if(!channelId){
            return res.status(400).json({error:"Channel ID missing"})
        }

        if(!messageId){
            return res.status(400).json({error:"Message ID missing"});
        }

        const server = await db.server.findFirst({
            where:{
                id:serverId as string,
                members:{
                    some:{
                        profileId:profile.id
                    }
                }
            },
            include:{
                members:true
            }
        })

        if(!server){
            return res.status(404).json({error:"Server not found"});
        }

        const channel = await db.channel.findFirst({
            where:{
                id:channelId as string,
                serverId:serverId as string
            }
        })

        if(!channel){
            return res.status(404).json({error:"Channel not found"});
        }

        const member = server.members.find((member) => member.profileId === profile.id);

        if(!member){
            return res.status(404).json({error:"Member not found"});
        }

        let message = await db.message.findFirst({
            where:{
                id: messageId as string,
                channelId: channelId as string
            },
            include:{
                member:{
                    include:{
                        profile:true
                    }
                }
            }
        })
    }catch(err){
        console.log("[MESSAGE_ID]",err);
        return res.status(500).json({error:"Internal Error"})
    }
}