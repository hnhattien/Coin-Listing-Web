import React, { useEffect , useState } from 'react'
import { Modal, Form, Input, Select, Upload } from 'antd';
import styled from 'styled-components';
import { COINGECKO_API_URL } from '../CoinmarketcapAPI/index';
import API from '../service/API/index';
import { FiCamera } from 'react-icons/fi';
const SubmitProjectBlock = styled.div`
    &{
        background-color: rgba(0,0,0,.2);
        height: 45px;
        border-radius: 10px;
        text-align: center;
        line-height: 45px;
        cursor: pointer;
        color: white;
        
        padding-right: 10px;
        margin: auto;
    }
    &:hover{
        background-color: #E40B7B;
    }
`

function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
}
export default function SubmitProjectModal() {
    const [isShowModal, setIsShowModal] = useState(false);
    const [logoFiles, setLogoFiles] = useState([]);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const [previewVisible, setPreviewVisible] = useState(false);
    const { form } = Form.useForm();
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState(null);
    const getCategories = () => {
        const headers = {};
        headers['Accept'] = "application/json";
        headers['Content-Type'] = "application/json";
        let params = {};
        params['order'] = "market_cap_desc";

        const url = `${COINGECKO_API_URL}/coins/categories`;
        const requestInfo = {headers, params};
     
        API.get(url,requestInfo).then((res)=>{
            console.log(res);
            if(res.error){
                setError(res.error);
            }
            else{
              if(Array.isArray(res)){
                setCategories(res);
          
              }
            }
        }).catch(err => {
            console.log(err);
        });

    }
    const handleOk = () => {

    }
    const exitModal = () => {
        setIsShowModal(false);
    }

    useEffect(()=>{
        if(!categories){
            getCategories();
        }
    },[])
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    }
    const cancelUploadLogo = () => {
        setPreviewVisible(false);
    }
    const handleChange = ({ fileList }) => {
        setLogoFiles(fileList);
    };
    const uploadButton = (
        <div>
          <FiCamera />
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    return (
        <>
            <SubmitProjectBlock onClick={ev => {setIsShowModal(true)}}>
                Submit Project    
            </SubmitProjectBlock>
            <Modal destroyOnClose={true} style={{}} title="Submit Project" 
            visible={isShowModal} 
            onOk={handleOk} 
            onCancel={exitModal}>
              <Form layout={"vertical"} size='lagre' form={form}>
                <Form.Item label="Title" name="title" required={true}>
                    <Input size={'large'}>
                        
                    </Input>
               </Form.Item>
               <Form.Item label="Category" name="category" required={true}>
                    <Select size="large">
                        {categories && categories.map((cate, index) => {
                            return <Select.Option key={index}>
                                {cate.name}
                            </Select.Option>
                        })}
                    </Select>                    
               </Form.Item>
               <Form.Item label="Short Introduction" name="shortintroduction" required={true}>
                    <Input.TextArea maxLength={250} showCount>

                    </Input.TextArea>
               </Form.Item>
               <Form.Item label="Logo" required={true}>
                <Upload
                name='logo'
                multiple={false}
                supportServerRender={false}
                action={(file) => {
                    console.log(file);
                }}
                customRequest={() => {
                     
                }}
                maxCount={1}
                listType="picture-card"
                fileList={logoFiles}
                onPreview={handlePreview}
                onChange={handleChange}
                >
                {logoFiles && (logoFiles.length !== 0 ? null : uploadButton)}
                {console.log(logoFiles)}
                </Upload>
                <Modal
                
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={cancelUploadLogo}
                >
                <img style={{ width: '100%' }} src={previewImage} />
                </Modal>
               </Form.Item>
               <Form.Item name="twitter" label="Twitter" required={true}>
                  <Input size={'large'}>
                  </Input>
               </Form.Item>
              </Form>
            </Modal>
        </>
    )
}
