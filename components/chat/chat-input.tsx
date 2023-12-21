"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus, Smile } from "lucide-react";
import queryString from "query-string";
import axios from "axios";

interface ChantInputProps{
    apiUrl:string;
    query:Record<string, any>;
    name:string;
    type:"conversation" | "channel";
}

const formScheme = z.object({
    content:z.string().min(1)
})

const ChatInput = ({
    apiUrl,
    query,
    name,
    type
}:ChantInputProps) => {
    const form = useForm<z.infer<typeof formScheme>>({
        resolver:zodResolver(formScheme),
        defaultValues:{
            content:""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formScheme>) => {
        console.log(values);
        try{
            const url = queryString.stringifyUrl({
                url:apiUrl,
                query,
            });
            console.log(url);
            await axios.post(url, values);
        }catch(err){
            console.log(err);
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="content"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <div className="relative p-4 pb-6">
                                    <button
                                        type="button"
                                        onClick={() => {}}
                                        className="absolute top-7 left-8 h-[24px] w-[24px]
                                        bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600
                                        dark:hover:bg-zinc-300 transition rounded-full p-1
                                        flex items-center justify-center"
                                    >
                                        <Plus className="tex-white  dark:text-[#31338]"/>
                                    </button>
                                    <Input 
                                        className="px-14 py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none 
                                        border-0 focus-visible:ring-0 focus-visible:ring-offset-0
                                        text-zinc-600 dark:text-zinc-200"
                                        disabled={isLoading}
                                        placeholder={`Message ${type==="conversation" ? name : "#" + name}`}
                                        {...field}
                                    />
                                    <div className="absolute top-7 right-8">
                                        <Smile/>
                                    </div>
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
}

export default ChatInput;