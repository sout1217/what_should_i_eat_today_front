// import store from '@/store/index'

export function setInterceptors(instance) {
  // Add a request interceptor
  instance.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      // console.log(config);
      // config.headers['Authorization'] = `Bearer ${store.state.token}`

      // 개발용 token
      /** 2021.10.19 - sns 로그인 토큰을 이용하기 위해 기존 env 에서 작업하던 토큰을 주석처리 하였음 */
      config.headers[
        'Authorization'
      ] = `Bearer ${process.env.VUE_APP_TEMP_ADMIN_TOKEN}`
      return config
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error)
    },
  )

  // Add a response interceptor
  instance.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error)
    },
  )
  return instance
}
