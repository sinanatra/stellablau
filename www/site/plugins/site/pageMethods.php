<?php

return [

    'createDescription' => function () {
        $description = $this->site()->descriptionSEO()->smartypants();
        return $description;
    },

    'createTitle' => function () {
        if ($this->template() == 'home') :
            return $this->site()->title()->smartypants();
        elseif ($this->template() == 'error') :
            return $this->site()->title()->smartypants() . ' | This page is not available.';
        else :
            return $this->site()->title()->smartypants() . ' | ' . $this->title()->smartypants();
        endif;
    },

    'createImage' => function () {
        $image = $this->site()->imageSEO()->toFile();
        return $image->crop(1200, 630, 'center')->url();
    }
];
