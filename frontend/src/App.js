import { Route, Routes } from 'react-router-dom';
import './App.css';
import Featured1 from './component/Featured1/Featured1';
import Featured from './component/featuredProps/Featured';
import Footer from './component/footer/Footer';
import Hero from './component/hero/Hero';
import Navbar from './component/Navbar/Navbar';
import News from './component/news/News';
import Popular from './component/popular/Popular';
import Properties from './component/properties/Properties';
import PropertyDetail from './component/propertyDetail/PropertyDetail';
import SignIn from './component/signIn/SignIn';
import SignUp from './component/signUp/SignUp';
import About from './component/About/About';
import Contact from './component/Contact/Contact';
import Type from './component/Types/Type';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={
          <>
            <Navbar />
            <Hero />
            <Popular />
            <Featured />
            {/* <Properties /> */}
            {/* <News /> */}
            <Footer />
          </>
        } />

        <Route path='/properties' element={
          <>
            <Navbar />
            <Properties />
            <Footer />
          </>
        } />
        <Route path='/propertyDetail/:id' element={
          <>
            <Navbar />
            <PropertyDetail />
            <Footer />
          </>
        } />
        <Route path='/Type' element={<Type />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/Featured1' element={<Featured1 />} />
        <Route path='/signIn' element={<SignIn />} />
        <Route path='/signUp' element={<SignUp />} />


      </Routes>

    </div>
  );
}

export default App;
