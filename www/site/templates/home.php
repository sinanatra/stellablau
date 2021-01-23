<?php snippet('head') ?>

<?php foreach ($site->tags()->toStructure() as $category) : ?>
    <?= $category->category() ?>
<?php endforeach; ?>


<div class="data-container" style="display: none;">
    <?php foreach ($site->children()->listed() as $project) : ?>
        <?php $datacolor = '' ?>

        <?php foreach ($site->tags()->toStructure() as $category) : ?>
            <?php $checkcategory1 = str_replace(' ', '', $category->tags()); ?>
            <?php $checkcategory2 = str_replace(' ', '', $project->tags()); ?>
            <?php if ($checkcategory1 == $checkcategory2) : ?>
                <?php $datacolor = $category->color() ?>
                <?php $thiscategory = $category ?>
            <?php endif ?>
        <?php endforeach; ?>

        <a class="data-category" href="<?= $project->url() ?>" data-cluster="<?= $thiscategory ?>" data-link="<?= $project->tags() ?>" data-color="<?= $datacolor ?>" data-url="<?= $project->url() ?>"><?= $project->title() ?></a>
    <?php endforeach; ?>
</div>
<div class="svgContainer"></div>
<div class="impressum">
    <button>Credits</button>
</div>
<div class="impressum-text">
    <?= $site->aboutB()->text() ?>
</div>



<?php snippet('foot') ?>