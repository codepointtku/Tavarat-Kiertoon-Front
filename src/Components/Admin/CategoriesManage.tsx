import { useLoaderData } from 'react-router-dom';
import type { categoriesManageLoader } from '../../Router/loaders';

function CategoriesManage() {
    const { categories, categoryTree } = useLoaderData() as Awaited<ReturnType<typeof categoriesManageLoader>>;

    console.log('cats', categories);
    console.log('tree', categoryTree);

    return 'jeejee';
}

export default CategoriesManage;
