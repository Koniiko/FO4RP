function formatDate(timestamp) {
    return (new Date(timestamp)).toLocaleDateString({day: '2-digit',weekday: false,year: '2-digit',month: '2-digit',hour: '2-digit',minute: '2-digit',second: '2-digit'});
}

jQuery(function($){
    // IE and some browsers tend to escape all html inside of noscript tag so .text() should be used instead of .html()
    var noscriptSwap = ($("<noscript><div>OK</div></noscript>").html().indexOf("&gt;") == 7)

    var isMobile = (function() {
        var check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    })();

    setTimeout(function(){
        $('html').addClass('loaded');
    },500)

    if (!noscriptSwap && !isMobile) {
        $("html").addClass('with-effects');
    }
     

    /*if (window.location.pathname.length > 1) {
        var hl = document.createElement('style')
        hl.innerHTML = 'a[href*="'+window.location.pathname+'"]{color:yellow}';
        document.head.appendChild(hl)
    }*/

    var fixMenuWidth = function(){
        
        /*var minMenuWidth = 0;
        $('#aside a').each(function(i, item){
            var width = $(item).outerWidth();
            if (minMenuWidth < width) minMenuWidth += width;
            console.log(width)
        });
        if (minMenuWidth) {
            $('#aside').css('min-width',minMenuWidth + 'px')
        }*/
    }; fixMenuWidth()

    function textNodesUnder(node){
        var all = [];
        for (node=node.firstChild;node;node=node.nextSibling){
            if (node.nodeType==3) all.push(node);
            else all = all.concat(textNodesUnder(node));
        }
        return all;
    }

    var exTerminal = undefined
    var anims = []
    var speed = 100
    var gen = function(node,text){return function(){if (node && node.data) node.data = text}}
    function typeIn(el) {
        var placeholder = '=';
        if (placeholder.repeat) {
            placeholder = placeholder.repeat(500)
        } else for (var i = 0; i < 500; i++) placeholder += '=';
        $('.hr',el).text(placeholder); 
        $('.typein',el).removeClass('typein')
        $('a',el).each(function(){
            if (this.innerHTML) this.innerHTML = '[' + this.innerHTML + ']';
        })

        $("#contents").html("")
        var headers = $('h1,h2,h3,h4,h5,h6', el)
        if (headers.length > 3) {
            headers.each(function(i,e){
                $('#contents').append('<a href="#'+e.id+'">  ['+e.innerHTML.trim(':. ;-')+']</a>');
            });
        }

        if (!(!noscriptSwap && !isMobile)) return;

        var nodes = textNodesUnder(el)
        for (var i = 0; i < nodes.length; i++) if (!nodes[i].done && nodes[i].data) {
            data = nodes[i].data.split('')
            var noise = nodes[i].data.replace(/[^\s]/gi," ")
            nodes[i].data = noise
            if (speed < 1) speed = 100;
            for (var pos = 0; pos < data.length; pos+=speed) {
                anims.push(gen(nodes[i],data.slice(0,pos+1).join('') + noise.substr(0,data.length - pos - 1)))  
            }
            anims.push(gen(nodes[i],data.join('')))
        }
    }
    setInterval(function(){ 
        if (anims.length) {
            (anims.shift())()
            if (Math.random() < 0.2) createjs.Sound.play("scroll")
            //if (exTerminal) exTerminal.pause()
        } else {
            //if (exTerminal) exTerminal.resume()
        }
        speed -= 10
        if (speed < 0 ) speed = 0

        // Linker
        if (!window.location.pathname || '/' == window.location.pathname) {
            $('a.active').removeClass('active')
        }   else {
            $('a.active:not([href*="'+window.location.pathname+'"])').removeClass('active');
            $('a[href="'+window.location.pathname+'"]:not(.active)').addClass('active');
        }
    },5)

    var anid = 0;
    function echo(html, options) {
        options || (options = {});
        undefined != options.animate || (options.animate = true)
        
        html = html.replace(/@([А-яA-z0-9]+)/g,'<span class="mention">@$1</span>');
        $el = $('<div class="row typein">'+html+'</div>');
        
        var scroll = false;
        if (options.id) {
            var $el2 = $('[data-id="'+options.id+'"]');
            /*if ($el2.length) {
                var child = $el2.offset().top;
                var parent = $el2.parent().offset().top;
                var offset = child - parent + 18;
                $('#content').scrollTop($('#content').scrollTop() + offset);
                return;
            } 
            scroll = true;*/
            $el.attr('data-id', options.id);
        } 

        $('#content').html('')
        $('#content').append($el);

        /*if (scroll) {
            var child = $el.offset().top;
            var parent = $el.parent().offset().top;
            var offset = child - parent;
            $('#content').scrollTop($('#content').scrollTop() + offset);
        }*/

        if (options.animate) {
            typeIn($el[0]);
        }
        //!options.animate || typeIn($('.typein')[0])
    }
    window.echo = echo;
    /**
     * if (noscriptSwap) {
            term.echo($("#source").text(),{raw:true})
        } else {
            term.echo($("#source").html(),{raw:true})
        }
     */
    $(document).on('wheel','#content, #aside',function(e){
        $(e.currentTarget).scrollTop($(e.currentTarget).scrollTop() + e.originalEvent.deltaY/2);
    })

    $(document).on('click','[data-category-filter],[data-subcategory-filter]',function(){
        var category = $(this).attr('data-category-filter')
        var subcategory = $(this).attr('data-subcategory-filter')
        var els = subcategory ? $('[data-category="'+category+'"][data-subcategory='+subcategory+']') : $('[data-category="'+category+'"]:not([data-subcategory])')
        if (els.not('.active').length == 0) {
            els.removeClass('active')
            $('.state',this).html('+')
        } else {
            els.addClass('active')
            $('.state',this).html('-')
        }
    })

    var skin = null, asidePosition = null;
    if (window.localStorage) {
        skin = localStorage.getItem('skin');
        asidePosition = localStorage.getItem('aside-position');
    }
    if (!skin) skin = 'green';
    if (!asidePosition) asidePosition = 'right';
    var skinLink = document.createElement('link')
    skinLink.id = 'skin'
    skinLink.rel = 'stylesheet'
    skinLink.type = 'text/css'
    skinLink.href = '/assets/skin/'+skin+'.css'
    document.head.appendChild(skinLink)

    if (asidePosition != 'left') $('#aside').parent().removeClass('reverse')

    $(document).ready(function(e){
        $("#prompt").cmd({
            prompt: 'guest@poseidon:net/> ',
            width: '100%',
            commands: function(cmd) {

            }
        })

        var data = noscriptSwap ? $('#source').text() : $('#source').html();
        $('#source').remove();
        echo( data, {animate: false} );
        typeIn($('body')[0]);
    });

    // Links handling
    $(document).on('click', 'a', function(e){
        if ($(this).attr('href').startsWith('#')) {
            return;
        }

        e.preventDefault(); e.stopPropagation()
        var url = $(this).attr('href')
        $.get(url, function(html){
            var data = noscriptSwap ? $('#source',html).text() : $('#source',html).html();
            if (data.trim()) {
                echo(data, {id: url})

                if (window.history) {
                    window.history.replaceState(undefined, undefined, url);
                }

            } else {
                window.location.href= url 
            }
        }).fail(function(){
            window.location.href = url
        });
        /*var href = $(this).attr('href')
        if (href.startsWith("#")) {
            if (href.startsWith("#!")) {
                if (exTerminal) exTerminal.exec(href.substr(2))
                return
            } else {
                if ($(href).length < 1) return $("#terminal").scrollTop(0) 
                
                var off = $("#terminal").scrollTop() + $(href).offset().top
                console.log(href,off)
                setTimeout(function(){
                    $("#terminal").scrollTop(off)
                },0)
                return
            }
        }
        if (exTerminal) exTerminal.exec("show " + href,true)*/
    })
});

/*

// IE and some browsers tend to escape all html inside of noscript tag so .text() should be used instead of .html()
var noscriptSwap = ($("<noscript><div>OK</div></noscript>").html().indexOf("&gt;") == 7)

var sIndex = 0;

var isMobile = function() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
};

if (createjs) {
    createjs.Sound.registerSound("/assets/sfx/login.mp3", "login");
    createjs.Sound.registerSound("/assets/sfx/logout.mp3", "logout");
    createjs.Sound.registerSound("/assets/sfx/scroll.mp3", "scroll");
    createjs.Sound.registerSound("/assets/sfx/select.mp3", "select");
    createjs.Sound.registerSound("/assets/sfx/select2.mp3", "select2");

    createjs.Sound.volume = 0.25

    $(window).bind('beforeunload', function(){
        createjs.Sound.play("logout")
    });
}

jQuery(function($){
    $("body").append("<div id='terminal' class='tbody'></div>");

    $(document).on('click', 'a', function(e){
        e.preventDefault(); e.stopPropagation()
        var href = $(this).attr('href')
        if (href.startsWith("#")) {
            if (href.startsWith("#!")) {
                if (exTerminal) exTerminal.exec(href.substr(2))
                return
            } else {
                if ($(href).length < 1) return $("#terminal").scrollTop(0) 
                
                var off = $("#terminal").scrollTop() + $(href).offset().top
                console.log(href,off)
                setTimeout(function(){
                    $("#terminal").scrollTop(off)
                },0)
                return
            }
        }
        if (exTerminal) exTerminal.exec("show " + href,true)
    })

    $(document).on("mouseover","a",function(e){
        e.preventDefault()
        //
        if(!$('.cmd').isInViewport()) return;
        //
        var href = $(this).attr('href')
        if (href.startsWith("#")) {
            if (href.startsWith("#!")) {
                if (exTerminal) exTerminal.set_command(href.substr(2))
                return
            } else return
        }
        if (exTerminal) exTerminal.set_command("show " + href,true)
    })

    $(document).on("mouseleave","a",function(e){
        if (exTerminal) exTerminal.set_command("",true)
    })
    
    function terminator(term) {
        if (sIndex > 0) {
            term.echo('<div style="min-height:2em" id="term_'+sIndex+'" class="hr">====<a href="#term_'+(sIndex - 2)+'"> Назад </a>==================================================================<a href="#term_top"> Вверх </a>=========================</div>',{raw:true})
        } else {
            term.echo('<div style="min-height:2em" id="term_'+sIndex+'" class="hr">=============================================================================<a href="#term_top"> Вверх </a>==========================</div>',{raw:true})
        }
        sIndex++;
    }

    $("#terminal").terminal(function(cmd,term){
        var args = cmd.split(/\s/)
        switch(args[0]) {
            case "": return
            case "go":
            case "run":
            case "show":
            case "load":
            case "открыть":
            case "cat":
            case "!":
            case "+" :
                //term.pause()
                $.get(args[1],function(html){
                    var el = document.createElement( 'html' );
                    el.innerHTML = html;
                    var ns = el.getElementsByTagName("noscript");
                    if (ns.length > 0) {
                        if (noscriptSwap) {
                            el.innerHTML = ns[0].innerText;
                        } else {
                            el.innerHTML = ns[0].innerHTML;
                        }
                        el = $("#main",el);
                        term.echo(el.html(),{raw:true});
                        terminator(term);
                        if (history) {
                            if (args[1].startsWith("/")) {
                                history.pushState(null, html, args[1]);
                            } else if (args[1].startsWith("http")) {
                                history.pushState(null, html, args[1]);
                            } else {
                                history.pushState(null, html, "/" + args[1]);
                            }
                        }
                    } else {
                        window.open(args[1])
                    }
                }).fail(function(){
                    if (arguments[0].status !== 404) window.open(args[1])
                    else if (args[1].startsWith("/")) term.echo("ОШИБКА: Файл не найден. <a href='https://github.com/fonline-roleplay/FO4RP/new/gh-pages/?filename="+args[1]+(args[1].endsWith("/") ? "index.md" : ".md")+"'>Создать его</a>?",{raw:true})
                    else term.echo("ОШИБКА: Файл не найден.")
                })
            break 
            case "log": 
            case "git": 
            case "гит": 
            case "лог": 
                $.get("https://api.github.com/repos/fonline-roleplay/FO4RP/commits", function(result) {
                    result = result.reverse();
                    for (var i in result) {
                        term.echo("<div><a href='"+result[i].html_url+"'>"+(new Date(result[i].commit.author.date).toLocaleDateString().replace(/\./g,'/'))+" - "+(null === result[i].author ? '' : result[i].author.login)+"</a>: "+result[i].commit.message.replace(/\n+/g,"<br>")+"</div>", {raw:true})
                    }
                    terminator(term);
                })
            break
            case "echo":
                term.echo(cmd,{raw:true})
                terminator(term);
            break
            case "menu":
            case "nav":
                var menu = $("header nav").html();
                if (!menu) {
                    term.echo("ОШИБКА: Меню не найдено");
                    return
                }
                term.echo("<nav>"+menu+"</nav>", {raw:true});
                terminator(term);
            break
            case "return":
            case "up":
            case "вверх":
                setTimeout(function(){
                    $("#terminal").scrollTop(0)
                },300)
            break
            case "reboot":
            case "рестарт":
                window.location.reload(true)
            break;
            case "eval":
                var rr= cmd.substr(4)
                term.echo(eval(!!rr ? rr : "Complete"))
            break
            default: 
                term.echo("ОШИБКА: Неизвестная команда <"+args[0]+">")
                terminator(term);
            break
            case "/?":
            case "?":
            case "man":
            case "help":
            case "помощь":
            case "справка":
                term.echo("go | run | show | load | открыть | cat <filename> - загружает страницу <filename>")
                term.echo("echo <html> - отображает введенный HTML")
                term.echo("log | git | гит | лог - отображает лог изменений игрового сервера")
                term.echo("up | return | вверх - прокручивает терминал в начало")
                term.echo("nav | menu | меню - отображает меню (если есть)")
                term.echo("reboot | рестарт - перезагружает терминал")
                terminator(term);
            break
        }
    }, {
        greetings: '',
        name: 'terminal',
        prompt: 'guest@poseidon:net/> ',
        scrollOnEcho: false,
        onAfterCommand : function(){
            createjs.Sound.play(Math.random() > 0.5 ? "select" : "select2")
        },
        onInit: function(term) {
            exTerminal = term
            
            var fn = term.echo
            term.echo = function() {
                var res = fn.apply(term, arguments)
                if (arguments[0].indexOf(term.get_prompt()) < 0) {
                    speed += 10

                    $("div[data-index]").each(function(i,el){
                        $(el).removeAttr('data-index')
                        typeIn(el)
                    })
                }
                return res
            }

            if (noscriptSwap) {
                term.echo($("#source").text(),{raw:true})
            } else {
                term.echo($("#source").html(),{raw:true})
            }
            
            $("#source").remove()

            $('#terminal').unbind('scroll')

            $(".prompt").on('click',function(e){
                term.exec("nav");
            })

        }
    })

    if (createjs) {
        $('#terminal').on('scroll',function(){
            createjs.Sound.play("scroll")
        })
        setTimeout(function(){
            createjs.Sound.play("login")
            if ($("#source").length > 0) {
                $("#terminal").html( $("#source").html() );
                $("#source").remove()
            }            
        },200)
    }

    $(document).on('click','.scroll-up',function(e){
        e.preventDefault()
        $("#terminal").scrollTop(0)
    })

    $(document).on('click','.scroll-dn',function(e){
        e.preventDefault()
        $("#terminal").scrollTop($("#terminal")[0].scrollHeight + window.innerHeight)
    })

    $(document).on('click','.terminal img',function(e){
        e.preventDefault()
        window.open($(this).attr('src'))
    })

    var test = document.createElement("div")
    var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
    var isFirefox = typeof InstallTrigger !== 'undefined';
    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    test.style['mix-blend-mode'] = "overlay"
    test.style['pointer-events'] = "none"
    if (test.style['mix-blend-mode'] === 'overlay' && test.style['pointer-events'] === 'none' && (isChrome || isFirefox || isOpera)){
        document.documentElement.classList.add("with-effects")
    }

    if (isMobile && !isChrome && !isFirefox && !isOpera && navigator.vendor != "") $("#terminal").css("overflow-y","scroll")
})
*/