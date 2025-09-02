// src/data/solutionsData.js

// Aquest arxiu només conté dades pures (text, números, etc.).
// No hi ha cap import de 'lucide-react' ni cap component de React.

export const AUTOMATION_DATA = {
    // --- CATEGORIA CHATBOTS ---
    chatbots: {
        name: "Chatbots i Assistents Virtuals",
        description: "Crea assistents intel·ligents que treballen 24/7 per atendre els teus clients, agendar cites i resoldre dubtes.",
        icon: "Bot", // Correcte: text
        solutions: [
            {
                title: "Bot de WhatsApp per a Gestió de Cites",
                description: "Un assistent virtual per a tallers o negocis que gestiona reserves de cites per WhatsApp, consulta la disponibilitat a AirTable i confirma amb el client.",
                videoUrl: "https://res.cloudinary.com/dvqhfapep/video/upload/v1753284792/Demo_final_presentaci%C3%B3_2_pqsvd6.mp4",
                previewImage: "https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                steps: [
                    { icon: "MessageSquare", title: "Recepció del Missatge", description: "El bot s'activa quan un client demana o modifica una cita per WhatsApp." },
                    { icon: "Database", title: "Consulta de Disponibilitat", description: "El sistema verifica en temps real els horaris lliures en una base de dades d'AirTable." },
                    { icon: "Sparkles", title: "Confirmació Intel·ligent", description: "Un agent d'IA gestiona la conversa i confirma la cita o suggereix alternatives." },
                    { icon: "CalendarClock", title: "Agendat!", description: "La cita queda registrada al calendari i es notifica a l'equip i al client." }
                ],
                technologies: ['WhatsApp', 'Airtable', 'OpenAI', 'Make']
            },
            {
                title: "Xatbot Conversacional Avançat ('Angel')",
                description: "Un assistent virtual que gestiona converses, respon preguntes i qualifica clients potencials 24/7 directament des del teu WhatsApp.",
                videoUrl: "https://res.cloudinary.com/dvqhfapep/video/upload/v1753284792/Demo_final_presentaci%C3%B3_2_pqsvd6.mp4",
                previewImage: "https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                steps: [
                    { icon: "MessageSquare", title: "Recepció Multiformat", description: "El xatbot entén missatges de text, àudio, imatges i stickers." },
                    { icon: "Database", title: "Memòria Persistent", description: "Analitza l'historial de la conversa amb Redis i PostgreSQL per entendre el context." },
                    { icon: "Sparkles", title: "Generació de Resposta Intel·ligent", description: "L'agent d'IA formula una resposta coherent, útil i amb el to de la teva marca." },
                    { icon: "Send", title: "Enviament Progressiu", description: "La resposta s'envia en missatges curts per simular una conversa humana." }
                ],
                technologies: ['WhatsApp', 'Redis', 'PostgreSQL', 'OpenAI', 'n8n']
            },
        ]
    },

    // --- CATEGORIA XARXES SOCIALS ---
    xarxes_socials: {
        name: "Xarxes Socials i Contingut",
        description: "Automatitza la creació i publicació de contingut a les teves xarxes per mantenir una presència activa sense esforç.",
        icon: "Share2", // Correcte: text
        solutions: [
            {
                title: "Publicador Automàtic per a Instagram i Facebook",
                description: "Planifica tot el teu contingut en un Google Sheet i deixa que el sistema publiqui automàticament a Instagram i Facebook el dia i hora que vulguis.",
                videoUrl: "https://res.cloudinary.com/dvqhfapep/video/upload/v1753284792/Demo_final_presentaci%C3%B3_2_pqsvd6.mp4",
                previewImage: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                steps: [
                    { icon: "CalendarClock", title: "Lectura del Calendari", description: "El sistema llegeix diàriament un Google Sheet per trobar publicacions programades." },
                    { icon: "Filter", title: "Validació de Contingut", description: "Verifica que la fila tingui tota la informació necessària (text, imatges/vídeo)." },
                    { icon: "Camera", title: "Processament d'Imatges/Vídeos", description: "Prepara les imatges o vídeos (individuals o carrusels) per a la seva publicació." },
                    { icon: "Send", title: "Publicació a Xarxes", description: "Envia el contingut a les plataformes seleccionades (Instagram, Facebook) a l'hora programada." }
                ],
                technologies: ['Google Sheets', 'Instagram', 'Facebook', 'Make']
            },
            {
                title: "Responedor Automàtic de Comentaris",
                description: "Una IA que analitza i respon automàticament els nous comentaris a les teves publicacions de Facebook i Instagram, millorant l'engagement.",
                videoUrl: "https://res.cloudinary.com/dvqhfapep/video/upload/v1753284792/Demo_final_presentaci%C3%B3_2_pqsvd6.mp4",
                previewImage: "https://images.pexels.com/photos/1181345/pexels-photo-1181345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                steps: [
                    { icon: "BellRing", title: "Detecció de Nou Comentari", description: "El sistema detecta un nou comentari en una de les teves publicacions." },
                    { icon: "BrainCircuit", title: "Anàlisi amb IA", description: "OpenAI analitza la intenció del comentari (pregunta, elogi, queixa)." },
                    { icon: "Sparkles", title: "Generació de Resposta", description: "L'IA redacta una resposta adequada, personalitzada i seguint les teves instruccions." },
                    { icon: "MessageSquare", title: "Publicació de la Resposta", description: "El sistema publica la resposta generada com a rèplica al comentari original." }
                ],
                technologies: ['Instagram', 'Facebook', 'OpenAI', 'Make']
            },
            {
                title: "Avatar amb Veu Pròpia",
                description: "Converteix qualsevol text o àudio en un vídeo d'un avatar realista, perfecte per a vídeos explicatius o contingut per a xarxes.",
                videoUrl: "https://res.cloudinary.com/dvqhfapep/video/upload/v1753284792/Demo_final_presentaci%C3%B3_2_pqsvd6.mp4",
                previewImage: "https://images.pexels.com/photos/7620853/pexels-photo-7620853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                steps: [
                    { icon: "Mic", title: "Entrada d'Àudio", description: "Puges un arxiu d'àudio amb la teva veu a una carpeta de Google Drive." },
                    { icon: "VenetianMask", title: "Generació amb HeyGen", description: "La plataforma HeyGen sincronitza l'àudio amb els moviments d'un avatar digital." },
                    { icon: "Video", title: "Creació del Vídeo", description: "Es renderitza un vídeo MP4 amb l'avatar parlant de forma natural." },
                    { icon: "FolderInput", title: "Desa a Drive", description: "El vídeo final es desa automàticament en una altra carpeta de Google Drive, llest per ser utilitzat." }
                ],
                technologies: ['Google Drive', 'HeyGen', 'Make']
            },
        ]
    },
    
    // --- CATEGORIA EDUCACIÓ I PRODUCTIVITAT ---
    educacio: {
        name: "Educació i Productivitat",
        description: "Eines per transformar contingut, crear material formatiu i optimitzar tasques d'aprenentatge o treball.",
        icon: "GraduationCap", // Correcte: text
        solutions: [
            {
                title: "De YouTube a Presentació de Google Slides",
                description: "Converteix automàticament la transcripció de qualsevol vídeo de YouTube en una presentació de Google Slides estructurada.",
                videoUrl: "https://res.cloudinary.com/dvqhfapep/video/upload/v1753284792/Demo_final_presentaci%C3%B3_2_pqsvd6.mp4",
                previewImage: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                steps: [
                    { icon: "Youtube", title: "Entrada del Link", description: "Enganxes el link d'un vídeo de YouTube en un Google Sheet." },
                    { icon: "FileText", title: "Extracció de la Transcripció", description: "El sistema obté automàticament tot el text del vídeo." },
                    { icon: "BrainCircuit", title: "Estructuració amb IA", description: "Un Assistent d'OpenAI analitza el text i el reorganitza en títols i punts clau per a diapositives." },
                    { icon: "Album", title: "Creació a Google Slides", description: "El contingut estructurat s'envia a una plantilla de Google Slides, creant una presentació completa." }
                ],
                technologies: ['Google Sheets', 'YouTube', 'OpenAI', 'Google Slides', 'Make']
            },
            {
                title: "Doblatge de Vídeos a Múltiples Idiomes",
                description: "Dobla automàticament els teus vídeos de YouTube a diversos idiomes (català, castellà, anglès, italià) utilitzant veus sintètiques d'alta qualitat.",
                videoUrl: "https://res.cloudinary.com/dvqhfapep/video/upload/v1753284792/Demo_final_presentaci%C3%B3_2_pqsvd6.mp4",
                previewImage: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                steps: [
                    { icon: "FileText", title: "Formulari d'Entrada", description: "Omples un formulari de Tally amb el link del vídeo i els idiomes desitjats." },
                    { icon: "Languages", title: "Processament amb ElevenLabs", description: "La IA d'ElevenLabs clona la veu original i genera els àudios en els nous idiomes." },
                    { icon: "Puzzle", title: "Sincronització de Doblatge", description: "El sistema sincronitza el nou àudio amb el vídeo original." },
                    { icon: "Send", title: "Enviament del Resultat", description: "Rebràs el vídeo final doblat, llest per publicar." }
                ],
                technologies: ['Tally', 'ElevenLabs', 'YouTube', 'Make']
            },
            {
                title: "Creador de Qüestionaris per a Telegram",
                description: "Transforma textos o documents en qüestionaris interactius de Telegram per validar coneixements o crear jocs educatius.",
                videoUrl: "https://res.cloudinary.com/dvqhfapep/video/upload/v1753284792/Demo_final_presentaci%C3%B3_2_pqsvd6.mp4",
                previewImage: "https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                steps: [
                    { icon: "FileText", title: "Entrada de Coneixement", description: "El sistema llegeix la informació des d'una base de dades de Notion." },
                    { icon: "BrainCircuit", title: "Generació de Preguntes amb IA", description: "Un model d'IA crea un qüestionari tipus test (fàcil, intermedi, difícil) basat en el text." },
                    { icon: "Bot", title: "Interacció a Telegram", description: "El bot de Telegram presenta les preguntes amb botons de resposta a l'usuari." },
                    { icon: "ClipboardCheck", title: "Correcció Instantània", description: "El bot marca les respostes com a correctes (✅) o incorrectes (❌) a l'instant." }
                ],
                technologies: ['Telegram', 'Notion', 'OpenAI', 'n8n']
            },
        ]
    },
    
    // --- CATEGORIA ADMINISTRACIÓ ---
    administracio: {
        name: "Administració i Gestió Interna",
        description: "Optimitza els teus fluxos de treball interns, des de la gestió de reunions fins a la distribució de nous clients potencials.",
        icon: "Briefcase", // Correcte: text
        solutions: [
            {
                title: "Assistent de Transcripció de Reunions (Zoom)",
                description: "Descarrega automàticament les gravacions de Zoom, les transcriu i les desa a Google Drive per a un fàcil accés i arxiu.",
                videoUrl: "https://res.cloudinary.com/dvqhfapep/video/upload/v1753284792/Demo_final_presentaci%C3%B3_2_pqsvd6.mp4",
                previewImage: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                steps: [
                    { icon: "Video", title: "Detecció de Gravació", description: "El sistema s'activa quan una nova gravació de Zoom està disponible." },
                    { icon: "Mic", title: "Descàrrega de l'Àudio", description: "Descarrega l'arxiu d'àudio (.m4a) de la reunió des del núvol de Zoom." },
                    { icon: "FileText", title: "Conversió i Transcripció", description: "Puja l'àudio a Google Drive i el converteix en un document de text transcrit." },
                    { icon: "FolderInput", title: "Arxiu a Google Drive", description: "El document final amb la transcripció queda desat i organitzat a Google Drive." }
                ],
                technologies: ['Zoom', 'Google Drive', 'Make']
            },
            {
                title: "Gestor de Tickets de Suport",
                description: "Un sistema complet que rep tickets de suport, els classifica amb IA, els assigna a l'equip corresponent i notifica a totes les parts.",
                videoUrl: "https://res.cloudinary.com/dvqhfapep/video/upload/v1753284792/Demo_final_presentaci%C3%B3_2_pqsvd6.mp4",
                previewImage: "https://images.pexels.com/photos/5676744/pexels-photo-5676744.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                steps: [
                    { icon: "Ticket", title: "Recepció del Ticket", description: "Un usuari envia una sol·licitud a través d'un formulari web." },
                    { icon: "BrainCircuit", title: "Classificació amb IA", description: "L'IA analitza el missatge per determinar la categoria (Facturació, Error, etc.) i la urgència." },
                    { icon: "Database", title: "Registre a la Base de Dades", description: "El ticket classificat es desa a una base de dades (PostgreSQL/Supabase)." },
                    { icon: "Mail", title: "Notificacions Automàtiques", description: "S'envien correus de confirmació al client i d'assignació a l'equip intern corresponent." }
                ],
                technologies: ['PostgreSQL', 'OpenAI', 'Gmail', 'n8n']
            },
            {
                title: "Gestor de Leads de Formulari a Discord",
                description: "Rep una notificació instantània i organitzada al canal de Discord correcte cada cop que un client potencial omple un formulari de contacte.",
                videoUrl: "https://res.cloudinary.com/dvqhfapep/video/upload/v1753284792/Demo_final_presentaci%C3%B3_2_pqsvd6.mp4",
                previewImage: "https://images.pexels.com/photos/5926382/pexels-photo-5926382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                steps: [
                     { icon: "FileText", title: "Recepció del Formulari", description: "El sistema s'activa quan algú envia un formulari a través de Jotform o Tally." },
                     { icon: "Filter", title: "Anàlisi de l'Àrea d'Interès", description: "Llegeix el camp on l'usuari ha seleccionat l'àrea d'interès (IA, Comercial, etc.)." },
                     { icon: "Bot", title: "Enviament a Discord", description: "Envia un missatge al canal de Discord específic d'aquell departament." },
                     { icon: "BellRing", title: "Notificació a l'Equip", description: "L'equip corresponent rep una alerta immediata per atendre el nou lead." }
                ],
                technologies: ['Jotform', 'Discord', 'Make']
            }
        ]
    },

    // --- CATEGORIA ASSESSORIES I FINANCES ---
    assessories: {
        name: "Assessories i Finances",
        description: "Eines especialitzades per a consultories i empreses que necessiten estar al dia de la normativa i oportunitats financeres.",
        icon: "BarChart3", // Correcte: text
        solutions: [
            {
                title: "Vigilant de Subvencions Públiques",
                description: "Un sistema proactiu que monitoritza diàriament el DOGC per trobar, analitzar i notificar-te sobre subvencions rellevants.",
                videoUrl: "https://res.cloudinary.com/dvqhfapep/video/upload/v1753284792/Demo_final_presentaci%C3%B3_2_pqsvd6.mp4",
                previewImage: "https://images.pexels.com/photos/6801642/pexels-photo-6801642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                steps: [
                    { icon: "CalendarClock", title: "Monitorització Diària", description: "Cada matí, el sistema escaneja les noves publicacions a les fonts oficials." },
                    { icon: "Filter", title: "Filtrat i Verificació", description: "Descarta automàticament les ajudes ja arxivades o no rellevants." },
                    { icon: "ClipboardCheck", title: "Anàlisi de Rellevància amb IA", description: "Una IA experta llegeix cada nova subvenció i determina si és aplicable al teu perfil." },
                    { icon: "BellRing", title: "Alerta Personalitzada", description: "Si és rellevant, s'envia una notificació immediata per WhatsApp i/o email." }
                ],
                technologies: ['DOGC API', 'PostgreSQL', 'OpenAI', 'WhatsApp', 'n8n']
            },
            {
                title: "Gestor d'IVA Trimestral per a Autònoms",
                description: "Automatitza tot el procés de càlcul de l'IVA trimestral a partir de les teves factures i despeses registrades en un Google Sheet.",
                videoUrl: "https://res.cloudinary.com/dvqhfapep/video/upload/v1753284792/Demo_final_presentaci%C3%B3_2_pqsvd6.mp4",
                previewImage: "https://images.pexels.com/photos/73873/star-trail-long-exposure-stars-sky-73873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                steps: [
                    { icon: "CalendarClock", title: "Execució Trimestral", description: "El procés s'activa automàticament cada trimestre (o manualment si es prefereix)." },
                    { icon: "Database", title: "Lectura de Dades", description: "Llegeix totes les factures i despeses del període des del teu Google Sheet." },
                    { icon: "BarChart3", title: "Càlcul de l'IVA", description: "Calcula l'IVA repercutit, l'IVA suportat i determina el resultat final (a pagar o a compensar)." },
                    { icon: "FileText", title: "Generació i Enviament d'Informes", description: "Crea un informe en PDF amb el resum i l'envia per email, arxivant una còpia a Google Drive." }
                ],
                technologies: ['Google Sheets', 'PDF.co', 'Google Drive', 'Gmail', 'n8n']
            },
        ]
    },

    // --- NOVA CATEGORIA: AGENTS AUTÒNOMS ---
    agents_autonoms: {
        name: "Agents Autònoms i RAG",
        description: "Solucions d'IA avançades amb capacitat de raonament, accés a eines i bases de coneixement personalitzades.",
        icon: "Mail", // Correcte: text
        solutions: [
            {
                title: "Creador de Base de Coneixement (RAG amb Imatges)",
                description: "Un sistema que llegeix documents (PDFs), extreu text i descripcions d'imatges, i ho indexa tot en una base de dades vectorial per a consultes.",
                videoUrl: "https://res.cloudinary.com/dvqhfapep/video/upload/v1753284792/Demo_final_presentaci%C3%B3_2_pqsvd6.mp4",
                previewImage: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                steps: [
                    { icon: "FileText", title: "Lectura i OCR del Document", description: "El sistema processa un PDF, extreu el text i analitza les imatges amb OCR de Mistral AI." },
                    { icon: "Camera", title: "Emmagatzematge d'Imatges", description: "Guarda les imatges extretes en un servei de Storage com Supabase." },
                    { icon: "BrainCircuit", title: "Chunking Semàntic", description: "L'IA divideix tot el contingut (text i descripcions d'imatges) en fragments coherents." },
                    { icon: "Database", title: "Vectorització i Emmagatzematge", description: "Cada fragment es converteix en un 'embedding' i es desa a la base de dades vectorial, llest per a consultes." }
                ],
                technologies: ['Mistral AI', 'Supabase', 'OpenAI', 'n8n']
            },
            {
                title: "Agent Intel·ligent Multitasca (MCP)",
                description: "Un 'cervell' central capaç d'interactuar amb múltiples eines (Calendari, Telegram, Notion, Oura Ring) per executar tasques complexes.",
                videoUrl: "https://res.cloudinary.com/dvqhfapep/video/upload/v1753284792/Demo_final_presentaci%C3%B3_2_pqsvd6.mp4",
                previewImage: "https://images.pexels.com/photos/7176027/pexels-photo-7176027.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                steps: [
                    { icon: "Bot", title: "Recepció d'Ordres", description: "L'agent rep una instrucció a través d'una interfície de xat o una API." },
                    { icon: "Puzzle", title: "Raonament i Elecció d'Eines", description: "L'IA (Claude) decideix quina eina necessita per complir la tasca (ex: 'crear un event' -> Eina de Calendari)." },
                    { icon: "FileCode2", title: "Execució de la Tasca", description: "L'agent executa l'eina seleccionada amb els paràmetres correctes." },
                    { icon: "Sparkles", title: "Generació de Resposta Final", description: "Un cop completada l'acció, l'agent informa a l'usuari del resultat." }
                ],
                technologies: ['Claude', 'Google Calendar', 'Telegram', 'Notion', 'n8n']
            },
        ]
    },
};