$(function(){
	var track = document.createElement('audio');
	let index_no = 0;
	track.id = "audio";
	track.attr = "controls";

	audio_track_list = [
		{
			name: "Alan_Walker_-_Fade",
			artist: "Alan_Walker",
			image: "1.jpg",
			path: "Alan_Walker_-_Fade.mp3",
		},
		{
			name: "Alan_Walker_-_Force",
			artist: "Alan_Walker",
			image: "2.jpg",
			path: "Alan_Walker_-_Force.mp3",
		},
		{
			name: "Alan_Walker_-_Spectre",
			artist: "Alan_Walker",
			image: "3.jpg",
			path: "Alan_Walker_-_Spectre.mp3",
		},
		{
			name: "Structure___mood_off_song",
			artist: "Unknown",
			image: "4.jpg",
			path: "Structure___mood_off_song.mp3",
		},
		{
			name: "Warriyo_-_Mortals",
			artist: "unknown",
			image: "5.jpg",
			path: "Warriyo_-_Mortals.mp3",
		}
	]

	//playlist open
	$(".music-count").on('click', function(){
		$(this).toggleClass("playlist_active");
		$(".playlist").toggleClass("p_active");
	})

	// volume value
	var volume_value = $("#volume").val();
	$(".current-volume").text(volume_value);
	track.volume = volume_value / 100;

	//music play function
	function play(){
		$('.play').html('<i class="fas fa-pause"></i>'); 
		track.play()
	}

	//music pause function
	function pause(){
		$('.play').html('<i class="fas fa-play"></i>');
		track.pause();
	}

	//current_time_function
	function track_cu_time_update(){
		var currentTime = Math.floor(track.currentTime);
		var minutes = Math.floor(currentTime / 60);
		var seconds = currentTime%60;

		if (minutes < 10){
			var minute = "0"+ minutes;
		}else{
			var minute = minutes;
		}
		
		if (seconds < 10 ){
			var second = "0"+ seconds;
		}else{
			var second = seconds;
		}
		
		$("#curent_time").text(minute + ":" + second);
	}

	//duration_time_function
	function track_du_time_update(){
		var duration = Math.floor(track.duration);
		var duration_minutes = Math.floor(duration / 60);
		var duration_seconds = duration%60;
		if (duration_minutes < 10){
			var d_minute = "0"+ duration_minutes;
		}else{
			var d_minute = duration_minutes;
		}

		if (duration_seconds < 10){
			var d_second = "0"+ duration_seconds;
		}else{
			var d_second = duration_seconds;
		}

		$( document ).ready(function() {
			$("#duration_time").text(d_minute + ":" + d_second);
			$("#track_duration").val(track.currentTime*100/track.duration);
		});
	}

	//Music Play Pause
	$('.play').click(function(){
		var $this = $(this);
		$this.toggleClass('active');
		if($this.hasClass('active')){
			play();
			$(this).addClass('active')    
		} else {
			pause()
		}
	});

	// index no function
	function music_play_nm(index_no){
		track.src = 'music/'+audio_track_list[index_no].path;
		$("#playback_image").attr("src", 'img/'+ audio_track_list[index_no].image) ;
		$("#current_track").text(index_no + 1);
		$("#song_title").text(audio_track_list[index_no].name);
		$("#artist").text(audio_track_list[index_no].artist)
	}

	music_play_nm( index_no );

	for (let i = 0; i < audio_track_list.length; i++) {
		$(".playlist").append("<div class='playlist_item p_song_title_"+i+"'> <div>"+audio_track_list[i].name+"</div> <div id='p_song_artist' class='p_artist'> Artist: "+audio_track_list[i].artist+"</div> </div>");

		$(".p_song_title_"+i).on('click', function() {
			index_no = i;
			music_play_nm( index_no )
			if($('.play').hasClass('active')){
				play();
				$('.play').addClass('active')
			}else{
				pause();
			}
		})
	}

	//forword track
	$("#forword_track").on("click", function(){
		if(index_no < audio_track_list.length -1 ){
			index_no += 1;
			music_play_nm( index_no );
			if($('.play').hasClass('active')){
				play();
				$('.play').addClass('active')
			}else{
				pause();
			}
		}else{
			index_no = 0;
			music_play_nm(index_no);
			if($('.play').hasClass('active')){
				play();
				$('.play').addClass('active')
			}else{
				pause();
			}
		}
	})

	//backword track
	$("#backword_track").on("click", function(){
		if(index_no > 0){
			index_no -= 1;
			music_play_nm( index_no );
			if($('.play').hasClass('active')){
				play();
				$('.play').addClass('active')
			}else{
				pause();
			}
		}else if ( index_no == 0 ){
			index_no = audio_track_list.length -1
			music_play_nm( index_no );
			if($('.play').hasClass('active')){
				play();
				$('.play').addClass('active')
			}else{
				pause();
			}
		}
	})

	//Music Volume
	$('#volume').on('change', function() {
		var volume_value = $("#volume").val();
		track.volume = volume_value / 100;
		$(".current-volume").text(volume_value);

		//Volume Icon
		if( track.volume == 0 ){
			$(".volume-ico i").removeClass("fa-volume-up");
			$(".volume-ico i").addClass("fa-volume-slash");
		}else{
			$(".volume-ico i").addClass("fa-volume-up");
			$(".volume-ico i").removeClass("fa-volume-slash");
		}

	});

	//mute music
	$("#volume_btn").on('click',function(){
		var uvol = track.volume = 0;
		$('#volume').val(uvol)
		$(".current-volume").text($('#volume').val());

		//Volume Icon
		if( track.volume == 0 ){
			$(".volume-ico i").removeClass("fa-volume-up");
			$(".volume-ico i").addClass("fa-volume-slash");
		}else{
			$(".volume-ico i").addClass("fa-volume-up");
			$(".volume-ico i").removeClass("fa-volume-slash");
		}
	})
	
	//music slider move
	$('#track_duration').on('change', function() {
		var slider_position = track.duration * ($("#track_duration").val() / 100);
		track.currentTime = slider_position;
		track_cu_time_update();
		track_du_time_update();
	})
	
	//track time fixer
	setInterval(() => {
		track_du_time_update();
		track_cu_time_update();

		//music end pause
		if(track.currentTime == track.duration){
			
			if($("#auto_play").hasClass("auto_active") && $('.play').hasClass('active' )&& index_no < audio_track_list.length ){
				index_no += 1;
				music_play_nm( index_no );
				play();
				track_du_time_update();
				track_cu_time_update();
			}else{
				pause();
				$('.play').removeClass('active')
			}
		}

	}, 1000)

	$("#repet").on('click',function(){
		track.currentTime = 0;
		track_cu_time_update();
		track_du_time_update();
	})

	$("#auto_play").on('click', function(){
		$(this).toggleClass('auto_active')
	})


	$("#total_track").text(audio_track_list.length)

})