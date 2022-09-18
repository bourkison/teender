import {fetchJwtToken, API_NAME} from '@/api/utility';
import {CreateSaveParams} from '@/types/save';
import {API} from 'aws-amplify';

export async function createSaveOrDelete(
    input: CreateSaveParams,
): Promise<void> {
    const path = '/save/' + input.productId;

    let init = input.init;
    init.headers = init.headers || {};
    init.headers.Authorization =
        init.headers.Authorization || (await fetchJwtToken());

    const data = await API.post(API_NAME, path, init).catch(err => {
        console.error(err);
        throw err;
    });

    if (!data.success) {
        console.warn('Unsuccessful like:', data.message);
    }
}
