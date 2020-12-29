<nav class="project__head">
    <span>toggle</span>
    <span>
        <a href="<?= $site->url() ?>"><h1 class="project__head-title"> <?= $page->title() ?></h1></a>
    </span>
    <span>
        <a class="project__head-next" href="<?= $site->children()->listed()->shuffle()->first()->url() ?>"> Next Project </a>
    </span>
</nav>
