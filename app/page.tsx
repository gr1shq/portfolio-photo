import Footer from "./(components)/Footer";
import Header from "./(components)/Header";
import About from "./(sections)/About";
import Contact from "./(sections)/Contact";
import Hero from "./(sections)/Hero";
import Portfolio from "./(sections)/Portfolio";

export default function Home() {
  return (
    <div> 
      <header>
        <Header />
      </header>
      <main>
        <Hero />
        <About />
        <Portfolio />
        <Contact />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
