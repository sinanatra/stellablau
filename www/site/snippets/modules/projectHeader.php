<nav class="project__head">
    <?php if ($page->text()->isNotEmpty()) : ?>
        <span class="project__head-toggle">
            <label class="switch">
                <input type="checkbox">
                <span class="slider round"></span>
                <span class="label">Text</span>
            </label>
        </span>
    <?php endif; ?>
    <?php if ($page->isListed()) : ?>
        <span class="project__head-title">
            <a href="<?= $site->url() ?>">
                <h1> <?= $page->title() ?></h1>
            </a>
        </span>
    <?php else : ?>

        <span class="project__head-title">
            <a href="<?= $site->url() ?>"></a>
        </span>
    <?php endif; ?>
    <span class="project__head-next">
        <a href="<?= $site->children()->filterBy('status', 'in', ['unlisted', 'listed'])->not('error', 'home')->shuffle()->first()->url() ?>"> <img src="<?= $site->files()->shuffle()->first()->url() ?>" /></a>
    </span>
</nav>