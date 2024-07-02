import { Button, Modal } from 'antd';
import { useState, useEffect } from 'react';
import './App.css'

function App() {
  // get api olish
  const [List, setList] = useState([]);
  useEffect(() => {
    fetch('https://autoapi.dezinfeksiyatashkent.uz/api/categories')
      .then((res) =>
        res.json()
      )
      .then((item) => setList(item?.data));
  }, []);
  // modal qo'shish
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // post api
  const [nameEn, setnameEn] = useState();
  const [nameRu, setnameRu] = useState();
  const [Pic, setPic] = useState();
  const tokenlar = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxOTkyNjQ3NiwiZXhwIjoxNzUxNDYyNDc2fQ.IOdD25deY44m8arP36YzgGRMPwd1b4FfaJLxnnbaS40"
  console.log(nameEn, nameRu, Pic);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name_en', nameEn);
    formData.append('name_ru', nameRu);
    formData.append('images', Pic);

    fetch('https://autoapi.dezinfeksiyatashkent.uz/api/categories', {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenlar}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <>
      <div className="container">
        <Button type="button" onClick={showModal} style={{backgroundColor:"blue", color:"white"}}>
          qo'shish
        </Button>
      </div>
      <div style={{ marginTop: "50px", marginLeft: "100px" }} >
        <table id="customers" >
          <thead>
            <tr>
              <th>en name</th>
              <th>ru name</th>
              <th>image</th>
            </tr>
          </thead>
          <tbody>
            {List.map((item, index) => (
              <tr key={index}>
                <td>{item.name_en}</td>
                <td>{item.name_ru}</td>
                <td><img style={{ width: "120px" }} src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item.image_src}`} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <form >
            <input onChange={(e) => setnameEn(e.target.value)} type='text' required placeholder='nameen' />
            <input onChange={(e) => setnameRu(e.target.value)} type='text' required placeholder='nameru' />
            <input onChange={(e) => setPic(e.target.files[0])} type='file' accept='image/*' required placeholder='rasm' />
            <button onClick={handleSubmit} type='submit' className="btn">qo'shish</button>
          </form>
        </Modal>
      </div>
    </>
  )
}

export default App
