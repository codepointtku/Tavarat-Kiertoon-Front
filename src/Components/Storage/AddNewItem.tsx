// /* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { useSubmit, useActionData, useLoaderData } from 'react-router-dom';

// import imageCompression from 'browser-image-compression';

import AlertBox from '../AlertBox';
import type { addProductAction } from '../../Router/actions';
import ProductForm from './ProductForm';
import { storageProductsLoader } from '../../Router/loaders';

type PicUpload = {
    file: File;
    url: string;
};

function AddNewItem() {
    const { storages, categories, colors } = useLoaderData() as Awaited<ReturnType<typeof storageProductsLoader>>;
    const [fileList, setFilelist] = useState<PicUpload[]>([]);
    // console.log('categories:', categories, 'storages:', storages, 'colors:', colors);
    const submit = useSubmit();
    const actionData = useActionData() as Awaited<ReturnType<typeof addProductAction>>;

    // TODO:  Add yup / zod / x for validation?

    // console.log('errors', errors);

    const onSubmit = async (data: any) => {
        const formData = new FormData();

        console.log(data);
        Object.entries(data).forEach(([key, value]) => {
            // console.log(key, value);
            if (key !== 'pictures' && key !== 'colors') formData.append(key, data[key]);
        });

        Object.values(data?.colors).forEach((color: any) => formData.append('colors[]', color));
        Object.values(fileList).forEach((pic: PicUpload) => formData.append('pictures[]', pic.file));
        submit(formData, {
            method: 'post',
            encType: 'multipart/form-data',
        });
    };
    // // TODO: add image compression
    // // commented code left for future image upload improvements

    // await apiCall(auth, setAuth, '/products/', 'post', formData, {
    //     headers: { 'Content-Type': 'multipart/form-data' },
    // });

    // const uploadFile = async (files) => {
    //     const options = {
    //         maxSizeMB: 1,
    //         useWebWorker: true,
    //     };

    //     const uploads = await Promise.all(Object.values(files).map(async (file) => imageCompression(file, options)));
    //     // // some code from kuvatestit branch, could be reused if pictures need to be sent before sending whole form:
    //     // // bring images to back-end with a call, then setItems into images brought back.
    //     // console.log(uploads);
    //     // const response = await axios.post('http://localhost:8000/pictures/', uploads, {
    //     //     headers: { 'content-type': 'multipart/form-data' },
    //     // });
    //     // console.log('axios pictures post', response.data);
    //     // setValue('pictures', response.data);
    //     setValue('pictures', uploads);
    // };

    // console.log('errors', errors);

    return (
        <>
            {actionData?.status === true && (
                <AlertBox
                    status="success"
                    text="Tuotteen luonti onnistui"
                    redirectUrl="/varasto/tuotteet/"
                    timer={1000}
                />
            )}
            {actionData?.status === false && (
                <AlertBox status="error" text="Tuotteen luonti epäonnistui" timer={3000} />
            )}

            <ProductForm
                fileList={fileList}
                setFilelist={setFilelist}
                storages={storages}
                categories={categories}
                colorList={colors}
            />
        </>
    );
}

export default AddNewItem;
