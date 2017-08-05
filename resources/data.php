<!DOCTYPE>
<html>
<head>
    <title>dost-project more content</title>
    <link rel="stylesheet" href="../css/main.min.css">
</head>
<body>
    <section id="c2">
        <section id="c2-content" class="masonry">
<?php
include 'xion.php';
if ($xion->connect_errno){
    echo'Failed to connect to Mysql: ('.$xion->connect_errno.')'.$mysqli->connect_error;
}
else {
	if(isset($_GET['last_shot'])&&$_GET['last_shot']>1){
    $shots_xion = $xion->query('SELECT * FROM shots ORDER BY id DESC LIMIT '.$_GET['last_shot'].',10') or die(mysqli_error());
        if ($shots_xion){
            while($get = mysqli_fetch_assoc($shots_xion)){
                switch ($get['type']) {
                    case 'SHOT':
                        if (empty($get['picture'])) {
                            #shot text
                            echo '

                <!--abre item shout texto!-->
                <article class="i_shot shot msry">
                    <span class="i_shot_tag">
                        <a href="">
                            '.$get['category'].' shot
                        </a>
                    </span>
                    <ul class="i_shot_options">
                        <li>Ocultar shot</li>
                        <li>Denunciar publicacion</li>
                        <li>Denunciar usuario</li>
                    </ul>
                    <section class="i_shot_header">
                        <a href="" class="i_shot_header_avatar user_click">
                            <img src="img/newuf.jpg" alt="">
                        </a>
                        @<a href="">'.$get['parent_user'].'</a> hizo una <a class="shot_click" href="">publicacion</a>:
                        <span class="i_shot_header_ago">'.$get['date_time'].'</span>
                    </section>
                    <p>
                        '.$get['s_content'].'
                    </p>
                    <hr>
                    <section class="i_shot_stats">
                        <span>'.$get['views'].'</span>
                        <span>'.$get['shares'].'</span>
                    </section>
                    <a class="i_shot_like" href=""></a>
                </article>
                <!--cierra item shout texto!-->
                            ';
                        } else {
                            if (empty($get['s_content'])) {
                                #shot img
                                echo '

                <!--abre item shout imagen!-->
                <article class="i_shot shot msry">
                    <span class="i_shot_tag">
                        <a href="">
                            '.$get['category'].' shot
                        </a>
                    </span>
                    <ul class="i_shot_options">
                        <li>Ocultar shot</li>
                        <li>Denunciar publicacion</li>
                        <li>Denunciar usuario</li>
                    </ul>
                    <section class="i_shot_header">
                        <a href="" class="i_shot_header_avatar user_click">
                            <img src="img/newuf2.jpg" alt="">
                        </a>
                        @<a href="">'.$get['parent_user'].'</a> compartio una <a class="shot_click" href="">imagen</a>:
                        <span class="i_shot_header_ago">'.$get['date_time'].'</span>
                    </section>
                    <a href="" class="i_shot_media shot_click">
                        <img src="img/'.$get['picture'].'" alt="">
                    </a>
                    <section class="i_shot_stats">
                        <span>'.$get['views'].'</span>
                        <span>'.$get['shares'].'</span>
                    </section>
                    <a class="i_shot_like" href=""></a>
                </article>
                <!--cierra item shout imagen!-->
                                ';
                            } else {
                                #shot img and text
                                echo '

                <!--abre item shout imagen!-->
                <article class="i_shot shot msry">
                    <span class="i_shot_tag">
                        <a href="">
                            '.$get['category'].' shot
                        </a>
                    </span>
                    <ul class="i_shot_options">
                        <li>Ocultar shot</li>
                        <li>Denunciar publicacion</li>
                        <li>Denunciar usuario</li>
                    </ul>
                    <section class="i_shot_header">
                        <a href="" class="i_shot_header_avatar user_click">
                            <img src="img/newuf2.jpg" alt="">
                        </a>
                        @<a href="">'.$get['parent_user'].'</a> compartio una <a class="shot_click" href="">imagen</a>:
                        <span class="i_shot_header_ago">'.$get['date_time'].'</span>
                    </section>
                    <p>
                        '.$get['s_content'].'
                    </p>
                    <a href="" class="i_shot_media shot_click">
                        <img src="img/'.$get['picture'].'" alt="">
                    </a>
                    <section class="i_shot_stats">
                        <span>'.$get['views'].'</span>
                        <span>'.$get['shares'].'</span>
                    </section>
                    <a class="i_shot_like" href=""></a>
                </article>
                <!--cierra item shout imagen!-->
                                ';
                            }
                            
                        }
                        
                        break;
                    case 'POST':
                        echo'
            <!--abre item post!-->
            <article class="i_post shot msry">
                <span class="i_post_back">
                    <img src="img/'.$get['picture'].'" alt="">
                </span>
                <span class="i_post_tag">
                    <a href="">
                        '.$get['category'].'
                    </a>
                </span>
                <h2>
                    <a class="post_click" href="post/'.$get['id'].'/'.$get['title'].'.html">'.unzip_varchar($get['title']).'</a>
                </h2>
                <section class="i_post_stats">
                    <span>'.$get['views'].'</span>
                    <span>'.$get['shares'].'</span>
                </section>
            </article>
            <!--cierra item post!-->
                        ';
                        break;
                }
            }
        }
        else {
            echo 'error conectando con la tabla shots';
        }
    }
}
?>
        </section>
    </section>
    <script type="text/javascript" src="../js/jquery-1.11.3.min.js"></script>
    <script type="text/javascript" src="../js/masonry.pkgd.min.js"></script>
    <script type="text/javascript" src="../js/imagesloaded.min.js"></script>
    <script type="text/javascript" src="../js/main.min.js"></script>
</body>
</html>