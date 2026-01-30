import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Github, ExternalLink, Code, Layers, CheckCircle, Smartphone, Globe, Terminal } from "lucide-react";
import { projects } from "@/data/portfolio";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";

const ProjectDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const project = projects.find((p) => p.id === Number(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!project) {
        return (
            <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
                <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
                <Link to="/" className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2">
                    <ArrowLeft className="w-5 h-5" /> Back to Portfolio
                </Link>
            </div>
        );
    }

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case "fullstack": return <Layers className="w-5 h-5" />;
            case "frontend": return <Globe className="w-5 h-5" />;
            case "backend": return <Terminal className="w-5 h-5" />;
            case "mobile": return <Smartphone className="w-5 h-5" />;
            default: return <Code className="w-5 h-5" />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white selection:bg-cyan-500/30">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-lg border-b border-white/10">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link to="/" className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 font-medium transition-colors">
                        <ArrowLeft className="w-5 h-5" /> Back to Portfolio
                    </Link>
                </div>
            </nav>

            <main className="container mx-auto px-4 pt-24 pb-16">
                {/* Header */}
                <div className="max-w-4xl mx-auto space-y-6 mb-12">
                    <div className="flex items-center gap-3 text-cyan-400 text-sm font-medium uppercase tracking-wider">
                        {getCategoryIcon(project.category)}
                        <span>{project.category}</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                        {project.title}
                    </h1>

                    <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                        {project.github !== "#" && (
                            <a
                                href={project.github.startsWith('http') ? project.github : `https://${project.github}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-all transform hover:-translate-y-0.5 border border-slate-700"
                            >
                                <Github className="w-5 h-5" /> View Source
                            </a>
                        )}
                        {project.live !== "#" && (
                            <a
                                href={project.live.startsWith('http') ? project.live : `https://${project.live}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-lg font-medium transition-all transform hover:-translate-y-0.5 shadow-lg shadow-cyan-500/20"
                            >
                                <ExternalLink className="w-5 h-5" /> Live Demo
                            </a>
                        )}
                    </div>
                </div>

                {/* Hero Image */}
                <div className="max-w-5xl mx-auto mb-16 relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                    <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-2xl aspect-video bg-slate-800">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                </div>

                {/* Content Grid */}
                <div className="max-w-4xl mx-auto grid md:grid-cols-[2fr,1fr] gap-12">

                    {/* Main Column */}
                    <div className="space-y-12">
                        {/* Overview */}
                        <section className="space-y-6">
                            <h2 className="text-2xl font-bold flex items-center gap-3">
                                <span className="w-8 h-px bg-cyan-400"></span>
                                Overview
                            </h2>
                            <p className="text-slate-300 leading-relaxed text-lg">
                                {project.longDescription || project.description}
                            </p>
                        </section>

                        {/* Key Features */}
                        {project.features && (
                            <section className="space-y-6">
                                <h2 className="text-2xl font-bold flex items-center gap-3">
                                    <span className="w-8 h-px bg-cyan-400"></span>
                                    Key Features
                                </h2>
                                <ul className="grid gap-4">
                                    {project.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3 bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                                            <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                                            <span className="text-slate-300">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Challenges & Solutions */}
                        {(project.challenges || project.solutions) && (
                            <div className="grid gap-8">
                                {project.challenges && (
                                    <section className="space-y-6">
                                        <h2 className="text-2xl font-bold flex items-center gap-3">
                                            <span className="w-8 h-px bg-red-400"></span>
                                            Challenges
                                        </h2>
                                        <ul className="list-disc list-inside space-y-2 text-slate-300 marker:text-red-400">
                                            {project.challenges.map((challenge, i) => (
                                                <li key={i}>{challenge}</li>
                                            ))}
                                        </ul>
                                    </section>
                                )}

                                {project.solutions && (
                                    <section className="space-y-6">
                                        <h2 className="text-2xl font-bold flex items-center gap-3">
                                            <span className="w-8 h-px bg-green-400"></span>
                                            Solutions
                                        </h2>
                                        <ul className="list-disc list-inside space-y-2 text-slate-300 marker:text-green-400">
                                            {project.solutions.map((solution, i) => (
                                                <li key={i}>{solution}</li>
                                            ))}
                                        </ul>
                                    </section>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Tech Stack */}
                        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 sticky top-24">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <Code className="w-5 h-5 text-cyan-400" />
                                Technologies
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((tech) => (
                                    <Badge
                                        key={tech}
                                        variant="secondary"
                                        className="bg-slate-700 hover:bg-slate-600 text-cyan-100 border-none px-3 py-1"
                                    >
                                        {tech}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProjectDetailsPage;
