
import ParticlesBackground from "./components/ParticlesBackground";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-cyber-bg text-white overflow-hidden">
      <ParticlesBackground />
      <div className="relative z-10 w-full flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl font-bold mb-6 mt-12">Cyber Portfolio</h1>
        <p className="text-lg mb-8">Senior Developer | Java | AI | Tech Lead</p>
        <a href="#projects" className="px-6 py-3 bg-cyber-purple text-white rounded-lg font-semibold shadow hover:bg-cyber-pink transition">See Projects</a>
        <section id="projects" className="mt-24 w-full max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8">Projects</h2>
          <ul className="space-y-6">
            <li className="bg-white/10 rounded-xl p-6 border border-cyber-purple/30">
              <a href="https://github.com/yourname/ai-java-service" className="text-cyber-cyan font-semibold text-xl hover:underline">AI-Powered Java Service</a>
              <p className="text-gray-300 mt-2">A demo service integrating Java Spring Boot with OpenAI APIs.</p>
            </li>
            <li className="bg-white/10 rounded-xl p-6 border border-cyber-purple/30">
              <a href="https://github.com/yourname/leadership-blog" className="text-cyber-cyan font-semibold text-xl hover:underline">Leadership Blog</a>
              <p className="text-gray-300 mt-2">Articles on transitioning from senior dev to tech lead.</p>
            </li>
            <li className="bg-white/10 rounded-xl p-6 border border-cyber-purple/30">
              <a href="https://github.com/yourname/ml-experiments" className="text-cyber-cyan font-semibold text-xl hover:underline">ML Experiments</a>
              <p className="text-gray-300 mt-2">Small ML projects using Python, deployed with Java backends.</p>
            </li>
          </ul>
        </section>
        <footer className="mt-24 text-gray-500 text-sm">
          © {new Date().getFullYear()} [Your Name]. All rights reserved.
        </footer>
      </div>
    </main>
  );
}
