import { useLoaderData, useParams, useActionData } from 'react-router-dom';
import { useState } from 'react';

import AlertBox from '../AlertBox';
import type { editProductAction } from '../../Router/actions';
import ProductForm from './ProductForm';
import { productEditLoader } from '../../Router/loaders';

type PicUpload = {
    file: File;
    url: string;
};

function EditProduct() {
    const { product, storages, categories, colors } = useLoaderData() as Awaited<ReturnType<typeof productEditLoader>>;
    const { id: productId } = useParams();

    const [fileList, setFilelist] = useState<PicUpload[]>([]);
    const actionData = useActionData() as Awaited<ReturnType<typeof editProductAction>>;
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
                productData={product}
                storages={storages}
                categories={categories}
                colorList={colors}
            />
        </>
    );
}

export default EditProduct;
