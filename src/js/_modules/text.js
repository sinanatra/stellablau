const Text = {
    init: () => {
        let text = $('.project__content-text');
        
        $('.project__content-fulltext figure').click(function () {
            $(this).toggleClass('biggerImg')
        });

        $('.switch input').change(function () {
            $('.project__content-video').toggle()
            $('.project__content-text').toggle()
            $('.project__content-fulltext').toggle()
            $('.project__content-img').toggle()
            $('.circle').toggle()


            if ($(this).is(':checked') == true) {
                $('.project__head').css('position', 'fixed')

                let paragraphs = $('.project__content-fulltext > div').children()

                let marginleft;

                if (window.innerWidth <= 650) {
                    marginleft = [0, 1];
                } else {
                    marginleft = [0, 1, 2, 3];
                }

                let previousValue, randomValue, previousParagraph;

                for (let item of paragraphs) {

                    // moving figures inside of paragraphs
                    if (item.tagName == 'FIGURE') {
                        previousParagraph.append(item)
                    } else {
                        previousParagraph = item;
                    }

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
                        if (window.innerWidth <= 650) {
                            $(item).css('width', '50%')
                        } else {
                            $(item).css('margin-left', '0vw')
                            $(item).css('width', [80, 60, 40, 20].random() + '%')
                        }
                    }
                    if (randomValue == 1) {
                        if (window.innerWidth <= 650) {
                            $(item).css('width', '50%')
                            $(item).css('margin-left', '40vw')
                        } else {
                            $(item).css('margin-left', '20vw')
                            $(item).css('width', [60, 40, 20].random() + '%')
                        }
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
                    // $('.circle').css('display', 'block')

                    for (let item of paragraphs) {

                        if (isElementInViewport(item) == true) {

                            let top = item.getBoundingClientRect().top
                            let right = item.getBoundingClientRect().right
                            let left = item.getBoundingClientRect().left
                            let bottom = item.getBoundingClientRect().bottom
                            $('.circle').css('margin-left', left - 10)

                        }
                        else {
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
    return rect.bottom > 100 &&
        rect.right > 0 &&
        rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
        rect.top < ((window.innerHeight / 4) || document.documentElement.clientHeight);
}


