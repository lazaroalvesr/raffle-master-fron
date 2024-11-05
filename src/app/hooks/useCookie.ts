import { cookies } from 'next/headers'

const useCookie = async () => {
    const cookie = await cookies();

    const getCookie = (key: string) => cookie.get(key);

    const setCookie = (key: string, value: string) => {
        cookie.set(key, value, {
            expires: 2,
            sameSite: "none",
            secure: true
        })
    }

    const removeCookie = (key: string) => cookie.delete(key);

    return { setCookie, getCookie, removeCookie }
}

export default useCookie;