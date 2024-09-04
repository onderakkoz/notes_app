import { Link } from 'react-router-dom'

const Undefined = () => {
  return (
    <div className='container py-5 mx-auto'>
        <h1>404</h1>
      <p>Aradığınız sayfa bulunamadı</p>
      <div>
        Anasayfa'ya Dön <Link to="/">Anasayfa</Link>
      </div>
    </div>
  )
}

export default Undefined;