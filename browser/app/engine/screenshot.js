

export function screenshot (width, height, callback, delay) {

    delay = delay || 1;

	setTimeout(function() {

        var arr = renderer.domElement.toDataURL().split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--) u8arr[n] = bstr.charCodeAt(n);
        var blob = new Blob([u8arr], {type:mime});
        var a = document.createElement("a"), url = URL.createObjectURL(blob);
        a.href = url;
        a.download = "render.png";
        document.body.appendChild(a);
        a.click();

        setTimeout(function() {

            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

        }, 0);

        if (callback != null) callback();

	}, 1000 * delay);
}
