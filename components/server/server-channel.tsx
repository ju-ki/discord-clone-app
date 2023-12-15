"use client";

import { Channel, ChannelType, MemberRole, Server } from "@prisma/client";
import { Hash, Mic, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

interface ServerChannelProps {
    channel:Channel,
    server:Server,
    role?:MemberRole
}

const iconMap = {
    [ChannelType.TEXT]:Hash,
    [ChannelType.AUDIO]:Mic,
    [ChannelType.VIDEO]:Video,
}

const ServerChannel = ({
    channel,
    server,
    role
}:ServerChannelProps) => {
    const params = useParams();
    const router = useRouter();
    const Icon = iconMap[channel.type];

    return (
        <div>
            Server Channel
        </div>
    );
}

export default ServerChannel;