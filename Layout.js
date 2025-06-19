import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Music, Home, Search, Library, Plus, Heart } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Playlist } from "@/entities/Playlist";
import { Instagram, Youtube, MessageSquare } from "lucide-react";

const navigationItems = [
  {
    title: "Início",
    url: createPageUrl("Home"),
    icon: Home,
  },
  {
    title: "Buscar",
    url: createPageUrl("Buscar"),
    icon: Search,
  },
  {
    title: "Biblioteca",
    url: createPageUrl("Biblioteca"),
    icon: Library,
  },
  {
    title: "Curtidas",
    url: createPageUrl("Curtidas"),
    icon: Heart,
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [userPlaylists, setUserPlaylists] = React.useState([]);

  React.useEffect(() => {
    loadPlaylists();
  }, []);

  const loadPlaylists = async () => {
    // NOTE: In a real multi-user app, you'd filter by created_by: user.email
    const playlists = await Playlist.list();
    setUserPlaylists(playlists);
  };

  return (
    <SidebarProvider>
      <style>
        {`
          :root {
            --background: 0 0% 8%;
            --foreground: 0 0% 98%;
            --primary: 221 83% 53%;
            --primary-foreground: 0 0% 98%;
            --secondary: 0 0% 14%;
            --secondary-foreground: 0 0% 98%;
            --accent: 0 0% 14%;
            --accent-foreground: 0 0% 98%;
            --destructive: 0 84% 60%;
            --destructive-foreground: 0 0% 98%;
            --muted: 0 0% 14%;
            --muted-foreground: 0 0% 63%;
            --card: 0 0% 10%;
            --card-foreground: 0 0% 98%;
            --popover: 0 0% 10%;
            --popover-foreground: 0 0% 98%;
            --border: 0 0% 20%;
            --input: 0 0% 20%;
            --ring: 221 83% 53%;
          }
          
          body {
            background: linear-gradient(135deg, #0c1427 0%, #1a0e1a 100%);
            min-height: 100vh;
          }
          
          .gradient-text {
            background: linear-gradient(135deg, #3b82f6 0%, #dc2626 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .glass-effect {
            background: rgba(15, 23, 42, 0.7);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
        `}
      </style>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Sidebar className="border-r border-slate-700/50 glass-effect flex flex-col">
          <SidebarHeader className="border-b border-slate-700/50 p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden">
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/70d5a621c_6c51a7e26_logo.png"
                  alt="NVFlow Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h2 className="font-bold text-white text-lg gradient-text">
                  NVFlow
                </h2>
                <p className="text-xs text-slate-400">Seu player musical</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="p-3 flex-1 overflow-y-auto">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={`hover:bg-blue-600/20 hover:text-blue-400 transition-all duration-300 rounded-xl mb-2 ${
                          location.pathname === item.url
                            ? "bg-blue-600/30 text-blue-400 shadow-lg"
                            : "text-slate-300"
                        }`}
                      >
                        <Link
                          to={item.url}
                          className="flex items-center gap-3 px-4 py-3"
                        >
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="mt-8">
              <div className="px-4 mb-4 flex justify-between items-center">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                  Suas Playlists
                </h3>
                <Link
                  to={createPageUrl("NovaPlaylist")}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </Link>
              </div>
              <SidebarGroupContent>
                <SidebarMenu>
                  {userPlaylists.map((playlist) => (
                    <SidebarMenuItem key={playlist.id}>
                      <SidebarMenuButton
                        asChild
                        className={`hover:bg-slate-700/30 hover:text-white transition-all duration-300 rounded-xl mb-1 w-full ${
                          location.pathname ===
                          createPageUrl(`Playlist?id=${playlist.id}`)
                            ? "bg-slate-700/40 text-white"
                            : "text-slate-300"
                        }`}
                      >
                        <Link
                          to={createPageUrl(`Playlist?id=${playlist.id}`)}
                          className="flex items-center gap-3 px-4 py-2"
                        >
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{
                              backgroundColor: playlist.cor_tema || "#1e40af",
                            }}
                          ></div>
                          <span className="font-medium text-sm truncate">
                            {playlist.nome}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-slate-700/50 p-4">
            <div className="flex justify-center items-center gap-4">
              <a
                href="https://www.instagram.com/wdzinx.sntss/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@wdzin.sntss"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://w.app/neonverse"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <MessageSquare className="w-5 h-5" />
              </a>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-b border-slate-700/50 px-6 py-4 md:hidden backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-slate-700/50 p-2 rounded-lg transition-colors duration-200" />
              <h1 className="text-xl font-bold text-white">NVFlow</h1>
            </div>
          </header>

          <div className="flex-1 overflow-auto">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
