import $ from 'jquery';

const loadHtmlSuccessCallbacks = [];

export function onLoadHtmlSuccess(callback) {
    if(!loadHtmlSuccessCallbacks.includes(callback)) {
        loadHtmlSuccessCallbacks.push(callback);
    }
}

function loadIncludes(parent) {
    if(!parent) { 
        parent = 'body'; 
    } else {
        parent = parent;
    }

    $(parent).find('[wm-include]').each(
        function (i, elemento) {
            const url = $(elemento).attr('wm-include');
            $.ajax({ 
                url, 
                success(dados) {
                    $(elemento).html(dados);
                    $(elemento).removeAttr('wm-include');
                    
                    loadHtmlSuccessCallbacks.forEach(callback => callback(dados));
                    loadIncludes(elemento);
                }
            })
        }
    )
}

loadIncludes();