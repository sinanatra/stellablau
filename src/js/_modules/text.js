const Text = {
    init: () => {
        let text = $('.project__content-text');

        $('.switch input').change(function () {
            $('.project__content-video').toggle()
            $('.project__content-text').toggle()
            $('.project__content-fulltext').toggle()
            $('.project__content-img').toggle()
            $('.circle').css('display','none')


            if ($(this).is(':checked') == true) {
                $('.project__head').css('position', 'fixed')

                let paragraphs = $('.project__content-fulltext > div').children()

                let marginleft = [0, 1, 2, 3]
                let previousValue, randomValue;

                for (let item of paragraphs) {

                    if (previousValue) {
                        let fileredArray = marginleft.filter(function (item) {
                            return item !== previousValue
                        })
                        randomValue = fileredArray.random()
                    }
                    else {
                        randomValue = marginleft.random()
                    }

                    previousValue = randomValue


                    if (randomValue == 0) {
                        $(item).css('margin-left', '0vw')
                        $(item).css('width', [80, 60, 40, 20].random() + '%')

                    }
                    if (randomValue == 1) {
                        $(item).css('margin-left', '20vw')
                        $(item).css('width', [60, 40, 20].random() + '%')
                    }
                    if (randomValue == 2) {
                        $(item).css('margin-left', '40vw')
                        $(item).css('width', [40, 20].random() + '%')
                    }
                    if (randomValue == 3) {
                        $(item).css('margin-left', '60vw')
                        $(item).css('width', [20].random() + '%')
                    }
                }

                $(window).scroll(function () {
                    $('.circle').css('display','block')

                    for (let item of paragraphs) {
                        if (isElementInViewport(item) == true) {


                            let top = item.getBoundingClientRect().top
                            let right = item.getBoundingClientRect().right
                            let left = item.getBoundingClientRect().left
                            let bottom = item.getBoundingClientRect().bottom

                            $('.circle').css('margin-left', left )

                        }
                        else{
                        }
                    };
                });
            }

            else {
                $('.project__head').css('position', 'unset')
            }
        });

    }
};

export default Text;

Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
}

function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return rect.bottom > 0 &&
        rect.right > 0 &&
        rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
        rect.top < ((window.innerHeight / 5) || document.documentElement.clientHeight);
}