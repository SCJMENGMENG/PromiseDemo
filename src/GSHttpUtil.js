class GSHttpUtil {

    static get(url) {

        return new Promise((resolve, reject) => {
            fetch(url)
                .then((response) => response.json())
                .then((responseData) => {
                    if (responseData) {
                        resolve(responseData.queryLocation);
                    } else {
                        reject('失败');
                    }
                })
                .then(()=>{
                    fetch(url)
                        .then((response) => response.json())
                        .then((responseData) => {
                            console.log(responseData + '-1111')
                        })
                        .catch((error) => {
                            console.log(error + '-2222')
                        })
                })
                .then(() => {
                    console.log('6666')
                })
                .catch((error) => {
                    reject(new Error('网络异常'));
                })
                .done();
        });

    }
}

export default GSHttpUtil