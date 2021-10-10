export function isPWA() {
    return window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches
}

export function formDataReq(json: any) {
    const formData = new FormData()
    for (let attr in json) {
        if (json[attr] || json[attr] === 0) formData.append(attr, json[attr])
    }
    return formData
}