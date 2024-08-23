// import { hash } from 'ohash'

// const fetch = async (url: string, options?: any, headers?: any) => {
//   try {
//     const config = useRuntimeConfig() // 3.0正式版环境变量要从useRuntimeConfig里的public拿
//     // const reqUrl = config.public.baseUrl.VITE_BASE_URL + url // 接口地址
//     // const reqUrl = config.env.production.VITE_BASE_URL + url // 接口地址
//     const reqUrl = "https://admin.yiban.site/app-api/site/" + url // 接口地址
//     // const reqUrl = "http://manage.yiban.site//app-api/site/" + url // 接口地址

//     // 不设置key，始终拿到的都是第一个请求的值，参数一样则不会进行第二次请求
//     const key = hash(options + url)
//     // 可以设置默认headers例如
//     const customHeaders = { token: useCookie('token'), ...headers }

//     const { data, error } = await useFetch(reqUrl, { ...options, headers: customHeaders})
//     // const { data, error } = await useFetch(reqUrl)

//     const res = data.value as any
//     console.log('res:', res);

//     if (res?.code !== 0) {
//       throw createError({
//         statusCode: 500,
//         statusMessage: reqUrl,
//         message: error?.value?.message || '服务器内部错误',
//       })
//     }
//     return res
//   } catch (err) {
//     console.log(err)
//     return Promise.reject(err)
//   }
// }

// export const getReq = (url: string, params?: any, headers?: any) => {
//   return fetch(url, { method: 'get', params }, headers)
// }

// export const postReq = (url: string, params?: any, headers?: any) => {
//   return fetch(url, { method: 'post', body: params }, headers)
// }

// export const putReq = (url: string, params?: any, headers?: any) => {
//   return fetch(url, { method: 'put', body: params }, headers)
// }

// export const delReq = (url: string, params?: any, headers?: any) => {
//   return fetch(url, { method: 'delete', params }, headers)
// }


// $fetch用法 
import { hash } from 'ohash'

const fetch = async (url: string, options?: any, headers?: any) => {
  try {
    const config = useRuntimeConfig()
    const apiUrl = config.public.apiBase;
    console.log('apiUrl:', apiUrl);
    // const reqUrl = "https://admin.yiban.site/app-api/site/" + url
    const reqUrl = apiUrl + url
    const key = hash(options + url)
    const customHeaders = { token: useCookie('token'), ...headers }

    const responseData = await $fetch(reqUrl, { ...options, headers: customHeaders })

    const res = responseData as any
    console.log('res:', res);

    if (res.error || res?.code !== 0) {
      throw createError({
        statusCode: 500,
        statusMessage: reqUrl,
        message: res?.message || '服务器内部错误',
      })
    }
    return res
  } catch (err) {
    console.log(err)
    return Promise.reject(err)
  }
}

export const getReq = async (url: string, params?: any, headers?: any) => {
  const options = {
    method: 'GET',
    params,
  }
  return fetch(url, options, headers)
}

export const postReq = async (url: string, params?: any, headers?: any) => {
  const options = {
    method: 'POST',
    body: params,
  }
  return fetch(url, options, headers)
}

export const putReq = async (url: string, params?: any, headers?: any) => {
  const options = {
    method: 'PUT',
    body: params,
  }
  return fetch(url, options, headers)
}

export const delReq = async (url: string, params?: any, headers?: any) => {
  const options = {
    method: 'DELETE',
    params,
  }
  return fetch(url, options, headers)
}