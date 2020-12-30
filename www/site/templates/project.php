<?php snippet('head') ?>
<?php snippet('modules/projectHeader') ?>

<section class="project__content">

    <?php if ($page->text()) : ?>
        <section class="project__content-text" id="scrolling">
        </section>
        <section class="project__content-fulltext">
            <div><?= $page->text()->kt() ?></div>
        </section>
    <?php endif; ?>

    <?php if ($page->mainImage()->isNotEmpty()) : ?>
        <section class="project__content-img">
            <?= $page->mainImage()->toFile() ?>
        </section>
    <?php endif; ?>

    <?php if ($page->text()->isNotEmpty()) : ?>
        <section class="project__content-fulltext">
            <div><?= $page->text()->kt() ?></div>
        </section>
        <div class="circle"></div>
    <?php endif; ?>

    <?php if ($page->vimeolink()->isNotEmpty()) : ?>
        <div class="project__content-video">
            <div class="chapters"></div>
            <div class="controls">
                <div class="togglePlay">
                    <button class="js-play"> Play </button>
                    <button class="js-pause"> Pause </button>
                </div>
                <div class="toggleSound">
                    <button class="js-mute"> Sound off </button>
                    <button class="js-sound"> Sound on </button>
                </div>

                <div class="project__progressbar"></div>
                <div class="project__timer"></div>
            </div>
            <?php if ($page->vimeolink()->isNotEmpty()) : ?>
                <iframe allow="autoplay" src="<?= $page->vimeolink() ?>"> </iframe>
            <?php endif; ?>
        </div>
    <?php endif; ?>
</section>

<?php snippet('foot') ?>

<?php foreach ($site->tags()->toStructure() as $category) : ?>
    <?php $checkcategory1 = str_replace(' ', '', $category->tags()); ?>
    <?php $checkcategory2 = str_replace(' ', '', $page->tags()); ?>
    <?php if ($checkcategory1 == $checkcategory2) : ?>
        <style>
            html {
                --background-highlight: <?= $category->color() ?>;
            }
        </style>
    <?php endif ?>
<?php endforeach; ?>