<nav class="project__head">
        <span class="project__head-toggle">
            <label class="switch">
                <input type="checkbox">
                <span class="slider round"></span>
                <span class="label">Text</span>
            </label>
        </span>
        <span class="project__head-title">
            <a href="<?= $site->url() ?>">
                <h1> <?= $page->title() ?></h1>
            </a>
        </span>

    <span class="project__head-next">
        <a href="<?= $site->children()->filterBy('status', 'in', ['unlisted', 'listed'])->not('error', 'home')->shuffle()->first()->url() ?>"> <img src="<?= $site->files()->shuffle()->first()->url() ?>" /></a>
    </span>
</nav>