"use client";
import {
    QueryClient,
    QueryClientProvider
} from "@tanstack/react-query";
import { useState } from "react";

export const QueryProvider = ({
    children
}: {
    children:React.ReactNode;
}) => {
    //キャッシュ管理のために使用される
    const [queryClient] = useState(() => new QueryClient());
    return (
       <QueryClientProvider client={queryClient}>
            {children}
       </QueryClientProvider>
    )
}