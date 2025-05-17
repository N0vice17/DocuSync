import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Plus,
    Users,
    ArrowRight,
    ExternalLink,
    FileEdit,
    FolderSyncIcon as Sync,
    History,
} from "lucide-react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [documentId, setDocumentId] = useState("");
    const navigate = useNavigate()

    const createNewDocument = () => {
        navigate(`/document`);
    };

    const joinDocument = (e) => {
        e.preventDefault();
        if (documentId.trim()) {
            navigate(`/document/${documentId}`);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-xl"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-blue-900 mb-2">DocuSync</h1>
                    <p className="text-blue-700 max-w-sm mx-auto">
                        Real-time collaborative document editing and synchronization
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Card className="border-0 shadow-lg bg-white overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>

                        <CardHeader className="pb-4">
                            <CardTitle className="text-center text-blue-900 text-xl">
                                Start Collaborating
                            </CardTitle>
                            <CardDescription className="text-center text-blue-600">
                                Create a new document or join an existing session
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            <Tabs defaultValue="new" className="w-full">
                                <TabsList className="grid grid-cols-2 mb-4">
                                    <TabsTrigger value="new">New Document</TabsTrigger>
                                    <TabsTrigger value="join">Join Document</TabsTrigger>
                                </TabsList>

                                <TabsContent value="new" className="space-y-4">
                                    <Button
                                        onClick={createNewDocument}
                                        className="w-full py-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group"
                                    >
                                        <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform duration-200" />
                                        <span className="font-medium">Create New Document</span>
                                    </Button>

                                    <div className="flex items-center justify-center gap-2 mt-4">
                                        <div className="text-xs text-blue-600">
                                            <Sync className="inline-block h-3 w-3 mr-1 animate-spin" />
                                            Auto-syncs with all collaborators in real-time
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-3 mt-4">
                                        <div className="p-4 rounded-lg border border-blue-100 bg-blue-50/50">
                                            <h3 className="text-sm font-medium mb-2 text-blue-700">
                                                Document Features:
                                            </h3>
                                            <ul className="text-xs space-y-2 text-slate-600">
                                                <li className="flex items-center gap-2">
                                                    <FileEdit className="h-3 w-3" />
                                                    Rich text editing with formatting options
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <Users className="h-3 w-3" />
                                                    Real-time collaboration with multiple users
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <History className="h-3 w-3" />
                                                    Version history and change tracking
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="join">
                                    <form onSubmit={joinDocument} className="space-y-4">
                                        <div className="relative">
                                            <Input
                                                type="text"
                                                placeholder="Enter document ID"
                                                value={documentId}
                                                onChange={(e) => setDocumentId(e.target.value)}
                                                className="w-full py-6 px-4 border border-blue-200 bg-blue-50/50 placeholder-blue-300 focus:ring-blue-500 focus:border-blue-500 rounded-lg transition-all duration-200"
                                            />
                                            <Button
                                                type="submit"
                                                disabled={!documentId.trim()}
                                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <ArrowRight className="h-5 w-5" />
                                            </Button>
                                        </div>
                                        <p className="text-xs text-slate-500">
                                            Enter the document ID shared with you to join the editing
                                            session
                                        </p>

                                        <div className="mt-4 p-4 rounded-lg border border-blue-100 bg-blue-50/50">
                                            <div className="text-xs text-blue-600 flex items-center gap-2">
                                                <Users className="h-4 w-4" />
                                                <span>
                                                    All changes sync instantly with everyone in the
                                                    session
                                                </span>
                                            </div>
                                        </div>
                                    </form>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-8 flex justify-center gap-6"
                >
                    <Button
                        variant="ghost"
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 flex items-center gap-1"
                    >
                        <ExternalLink className="h-4 w-4" />
                        <span>Help</span>
                    </Button>
                    <Button
                        variant="ghost"
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 flex items-center gap-1"
                    >
                        <Users className="h-4 w-4" />
                        <span>About DocuSync</span>
                    </Button>
                </motion.div>
            </motion.div>
            <div className="fixed top-20 right-20 w-64 h-64 bg-blue-200 rounded-full opacity-10 blur-3xl -z-10"></div>
            <div className="fixed bottom-20 left-20 w-80 h-80 bg-blue-300 rounded-full opacity-10 blur-3xl -z-10"></div>
        </div>
    );
}
