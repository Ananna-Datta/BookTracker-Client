import BookPage from './home/books/BookPage'
import Footer from './home/Footer';
import Navbar from './home/Navbar'
import { Toaster } from 'react-hot-toast';
function App() {

  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
        <Navbar></Navbar>
      <div className='flex flex-col items-center justify-center  min-h-[calc(100vh-100px-156px)]'>
      <BookPage></BookPage>
      </div>
      <Footer></Footer>
    </>
  )
}

export default App
