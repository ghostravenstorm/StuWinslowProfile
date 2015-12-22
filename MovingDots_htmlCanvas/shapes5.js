"use strict";
function createCanvas( id ){
	var canvas = {};
	canvas.id = document.getElementById(id);
	canvas.context = canvas.id.getContext('2d');
	canvas.ctx = canvas.id.getContext('2d');
	
	canvas.mouseX = 0;
	canvas.mouseY = 0;
	canvas.pmouseX = 0;
	canvas.pmouseY = 0;
	canvas.wmouseX = 0;
	canvas.wmouseY = 0;

	canvas.pixel = canvas.context.createImageData(1,1);
	canvas.pixeldata = canvas.pixel.data
	canvas.pixeldata[0] = 0;
	canvas.pixeldata[1] = 0;
	canvas.pixeldata[2] = 0;
	canvas.pixeldata[3] = 255;
	canvas.mousedown = false;

	canvas.frameRate = 1000/60;

	canvas.setMousePositionListener = function(evt)
	{
		var cBB = canvas.id.getBoundingClientRect();
		canvas.mouseX = evt.clientX - cBB.left;
		canvas.mouseY = evt.clientY - cBB.top;
	}
	canvas.id.addEventListener('mousemove', canvas.setMousePositionListener, false);

	canvas.setMouseWindowPositionListener = function(evt)
	{
		canvas.wmouseX = evt.clientX;
		canvas.wmouseY = evt.clientY;
	}
	window.addEventListener('mousemove', canvas.setMouseWindowPositionListener, false);

	canvas.mouse = [];
	canvas.setMouseDownListener = function(evt)
	{
		canvas.mousedown = true;
		canvas.mouse[evt.which] = true;
	}
	canvas.id.addEventListener('mousedown', canvas.setMouseDownListener, false);

	canvas.setMouseUpListener = function(evt)
	{
		canvas.mousedown = false;
		canvas.mouse[evt.which] = false;
	}
	canvas.id.addEventListener('mouseup', canvas.setMouseUpListener, false);

	/***************************************************************************************/
	canvas.getPixel = function( x, y )
	{
		return this.context.getImageData(x, y, 1, 1).data;
	}
	canvas.setFillGradient = function( x, y, w, h, angle, colors )
	{
		if( typeof colors != 'object' ) return false;

		var X,Y,W,H;

		/*
		if(angle === 'topToBottom')
			{ W = x; H = y+h; }
		else
		if(angle === 'leftToRight')
			{ H = y; }
		else
		if(angle === 'rightToLeft')
			{ X = x+w; W = x; H = y; }
		else
		if(angle === 'bottomToTop')
			{ W = x+w; H = y; X = w; Y = h; }
		else
		if(angle === 'topLeftToBottomRight')
			{ W = x+w; H = y+h; }
		else
		if(angle === 'bottomRightToTopLeft')
			{ X = x+w; Y = y+h; W = x; H = y; }
		else
		if(angle === 'bottomLeftToTopRight')
			{ Y = y+h; W = x+w; H = y; }
		else
		if(angle === 'topRightToBottomLeft')
			{ X = x+w; W = x; H = y+h; }
		*/

		var grad = this.context.createLinearGradient( X || x, Y || y, W || w, H || h );

		for( var i = 0; i < colors.length-1; i++ )
			grad.addColorStop(i*1/(colors.length-1),colors[i]);
		grad.addColorStop(1,colors[colors.length-1]);

		this.context.fillStyle = grad;

		return true;
	}
	/***************************************************************************************/
	canvas.draw = function()
	{
	}
	canvas.setPreciseFrameRate = function( frameRate )
	{
		this.frameRate = Math.max(1,Math.min( 1000/frameRate , 120 )) || 30;
		clearInterval( this.drawCanvas );
		var self = this;
		this.drawCanvas = setInterval( function() { self.draw() } , this.frameRate );
	}
	canvas.setVariableFrameRate = function( frameRate )
	{
		this.frameRate = Math.max(1,Math.min( 1000/frameRate , 120 )) || 30;
		clearInterval( this.drawCanvas );
		this.setTimeoutFrameRate();
	}
	canvas.setTimeoutFrameRate = function()
	{
		var self = this;
		this.drawCanvas = setTimeout( function() {
			self.draw();
			self.pmouseX = self.mouseX;
		    self.pmouseY = self.mouseY;
			self.setTimeoutFrameRate();
		} , this.frameRate );
	}
	canvas.clear = function()
	{
		this.context.clearRect(0, 0, this.id.width, this.id.height);
	}
	canvas.setVariableFrameRate(60);

	/***************************************************************************************/
	/***************************************************************************************/
	/***************************************************************************************/
	// Image Methods
	/***************************************************************************************/
	/***************************************************************************************/
	/***************************************************************************************/
	canvas.id.style.backgroundColor = '#bbb';
	canvas.context.strokeStyle = '#000';
	canvas.context.fillStyle = '#fff';

	canvas.strokeAlpha = 1;
	canvas.fillAlpha = 1;
	canvas.stroke = true;
	canvas.fill = true;

	canvas.rectHorizontal = 'left';
	canvas.rectVertical = 'top';
	canvas.roundHorizontal = 'center';
	canvas.roundVertical = 'center';
	canvas.r = 0;
	canvas.g = 0;
	canvas.b = 0;
	canvas.a = 0;

	canvas.rgba = function( r, g, b, a )
	{
		if(typeof this.r !== 'number') {
			console.log( ".rgba(): Not-a-Number Error, inputted value is rgba(" + r + "," + g + "," + b + "," + a + ")" );
			return false;
		}
		this.r = Math.clamp( Math.round(r), 0, 255 );
		this.a = Math.clamp( Math.round(1/255*a), 0, 1 ) || 1;

		if( isNaN(g) || isNaN(b) )
		{
			this.g = r;
			this.b = r;
		} 
		else 
		{
			this.g = Math.clamp( Math.round(g), 0, 255 );
			this.b = Math.clamp( Math.round(b), 0, 255 );
		} 
		return true;
	}
	canvas.setBackgroundColor = function( r, g, b, a )
	{	
		this.rgba( r, g, b, a );
		canvas.id.style.backgroundColor = 'rgba('+this.r+','+this.g+','+this.b+','+this.a+')';
	}
	canvas.setStrokeColor = function( r, g, b, a )
	{
		this.rgba( r, g, b, a );
		this.strokeAlpha = a;
		this.context.strokeStyle = 'rgb('+this.r+','+this.g+','+this.b+')';

		if(this.a <= 0) this.stroke = false;
		else this.stroke = true;
	}
	canvas.setFillColor = function( r, g, b, a )
	{
		this.rgba( r, g, b, a );
		this.fillAlpha = a;
		this.context.fillStyle = 'rgb('+this.r+','+this.g+','+this.b+')';

		if(this.a <= 0) this.fill = false;
		else this.fill = true;

		this.context.closePath();
	}
	canvas.setFillAlpha = function( a , maxAlpha )
	{
		if(typeof a !== 'number') {
			console.log( ".setFillAlpha: Not-a-Number Error, inputted value is " + a );
			return false;
		}
		maxAlpha = Math.clamp( maxAlpha, 0, 255 ) || 255;
		this.fillAlpha = Math.clamp( 1/maxAlpha*a, 0, 1 );

		if( a <= 0 || maxAlpha <= 0 ) 
			this.fill = false;
		else 
			this.fill = true;
		return true;
	}
	canvas.setStrokeAlpha = function( a , maxAlpha )
	{
		if(typeof a !== 'number') {
			console.log( ".setStrokeAlpha: Not-a-Number Error, inputted value is " + a );
			return false;
		}
		maxAlpha = Math.clamp( maxAlpha, 0, 255 ) || 255;
		this.strokeAlpha = Math.clamp( 1/maxAlpha*a, 0, 1 );

		if( a <= 0 || maxAlpha <= 0 ) 
			this.stroke = false;
		else 
			this.stroke = true;
		return true;
	}
	canvas.setStrokeWeight = function( weight )
	{
		this.context.lineWidth = weight;
	}
	canvas.setStrokeCap = function( cap )
	{
		if(cap === 'butt' || cap === 'round' || cap === 'square') 
		{
			this.context.lineCap = cap || this.endCap;
			return true;
		}
		console.log(".setStrokeCap(): Error, '"+cap+"' is not a valid value, use 'butt', 'round', or 'square'");
		return false;
	}
	canvas.noStroke = function()
	{
		this.stroke = false;
	}
	canvas.noFill = function()
	{
		this.fill = false;
	}
	canvas.rectAlignment = function( horizontal, vertical )
	{
		if( horizontal === 'center' || horizontal === 'left' || horizontal === 'right' )
			this.rectHorizontal = horizontal;
		else
			console.log('rectAlignment invalid horizontal value: ' + horizontal + " (horizontal unchanged, use 'center', 'left' or 'right')");
			
		if( vertical === 'center' || vertical === 'top' || vertical === 'bottom' )
			this.rectVertical = vertical;
		else
			console.log('rectAlignment invalid vertical value: ' + vertical + " (vertical unchanged, use 'center', 'top' or 'bottom')");

		return true;
	}
	canvas.roundAlignment = function( horizontal, vertical )
	{
		if( horizontal === 'center' || horizontal === 'left' || horizontal === 'right' )
			this.roundHorizontal = horizontal;
		else
			console.log('roundAlignment invalid horizontal value: ' + horizontal + " (horizontal unchanged, use 'center', 'left' or 'right')");
			
		if( vertical === 'center' || vertical === 'top' || vertical === 'bottom' )
			this.roundVertical = vertical;
		else
			console.log('roundAlignment invalid vertical value: ' + vertical + " (vertical unchanged, use 'center', 'top' or 'bottom')");

		return true;
	}
	canvas.setRectAlignmentX = function( x, w )
	{
		if ( this.rectHorizontal === 'center' )
			return x = x - w/2;
		else
		if ( this.rectHorizontal === 'right' )
			return x = x - w;
		return x;
	}
	canvas.setRectAlignmentY = function( y, h )
	{
		if ( this.rectVertical === 'center' )
			return y = y - h/2;
		else
		if ( this.rectVertical === 'bottom' )
			return y = y - h;
		return y;
	}
	canvas.setRoundAlignmentX = function( x, w ) //FIX
	{
		if ( this.rectHorizontal === 'left' )
			return x = x + w;
		else
		if ( this.rectHorizontal === 'right' )
			return x = x - w;
		return x;
	}
	canvas.setRoundAlignmentY = function( y, h ) //FIX
	{
		if ( this.rectVertical === 'top' )
			return y = y + h;
		else
		if ( this.rectVertical === 'bottom' )
			return y = y - h;
		return y;
	}
	canvas.setCompositeMode = function( filter )
	{
		if( filter === 'mozaic' ) // make mozaic mode, grab pixel color!
			return false;
		else
			this.context.globalCompositeOperation = filter;
		return true;
	}
	canvas.transformShape = function( px, py, r )
	{
		this.context.save();
		this.context.beginPath();
		this.context.translate( px, py );
		this.context.rotate( r*Math.PI/180 );
		this.context.translate( -px, -py );
	}
	canvas.drawShape = function()
	{
		if( this.fill )
		{
			if( this.context.globalAlpha !== this.fillAlpha ) 
				this.context.globalAlpha = this.fillAlpha;
			this.context.fill();
		}
		if( this.stroke )
		{
			if( this.context.globalAlpha !== this.strokeAlpha ) 
				this.context.globalAlpha = this.strokeAlpha;
			this.context.stroke();
		}
	}
	canvas.point = function( x, y, r, g, b, a )
	{
		if ( !this.fill ) return false;

		this.pixeldata[0] = r || this.pixeldata[0];
		this.pixeldata[1] = g || this.pixeldata[1];
		this.pixeldata[2] = b || this.pixeldata[2];
		this.pixeldata[3] = a || this.pixeldata[3];
		
		this.context.putImageData( this.pixel, x, y );
		return true;
	}
	canvas.line = function( x1, y1, x2, y2, rotation, pivot )
	{
		if ( !this.stroke ) return false;

		if( rotation )
		{
			var px, py;

			if( pivot === 'end' )
			{
				px = x2;
				py = y2;
			}
			else 
			if( pivot === 'center')
			{
				px = (x1 + x2) / 2;
				py = (y1 + y2) / 2;
			} 
			else 
			{
				px = x1;
				py = y1;
			}
			this.transformShape( px, py, rotation );
			this.context.moveTo( x1, y1 );
			this.context.lineTo( x2, y2 );
			this.context.restore();
		}
		else
		{
			this.context.beginPath();
			this.context.moveTo( x1, y1 );
			this.context.lineTo( x2, y2 );
		}

		if( this.context.globalAlpha !== this.strokeAlpha ) 
			this.context.globalAlpha = this.strokeAlpha;
		this.context.stroke();

		return true;
	}
	canvas.rect = function( x, y, w, h, rotation )
	{
		if ( w <= 0 || h <= 0 || !this.stroke && !this.fill ) return false;

		var px = x;
		var py = y;

		x = this.setRectAlignmentX( x, w );
		y = this.setRectAlignmentY( y, h );

		if(rotation)
		{
			this.transformShape( px, py, rotation );
			this.context.rect( x, y, w, h );
			this.context.restore();
		}
		else
		{
			this.context.beginPath();
			this.context.rect( x, y, w, h );
		}
		this.drawShape();
		return true;
	}
	canvas.circle = function( x, y, r, rotation )
	{
		if ( r <= 0 || !this.stroke && !this.fill ) return false;

		var px = x;
		var py = y;

		x = this.setRoundAlignmentX( x, r );
		y = this.setRoundAlignmentY( y, r );

		if( rotation ){
			this.transformShape( px, py, rotation );
			this.context.arc( x, y, r, 0, 2 * Math.PI, false );
			this.context.restore();
		}
		else
		{
			this.context.beginPath();
			this.context.arc( x, y, r, 0, 2 * Math.PI, false );
		}
		this.drawShape();
		return true;
	}
	canvas.ellipse = function( x, y, w, h, rotation )
	{
		if ( w <= 0 || h <= 0 || !this.stroke && !this.fill ) return false;
		if ( w === h ) return this.circle( x, y, w/2, rotation );

		var px = x;
		var py = y;

		var r;

		if( w < h )
		{
			r = w/2;
			h = h/w;
			w = 1;
		}
		else
		{
			r = h/2;
			w = w/h;
			h = 1;
		}

		x = this.setRoundAlignmentX( x, r ); // FIX ALIGNMENT
		y = this.setRoundAlignmentY( y, r ); // FIX ALIGNMENT

		this.context.save();
		this.context.beginPath();
		this.context.translate( px, py );
		if(rotation) this.context.rotate( rotation*Math.PI/180 );
		this.context.scale( w, h );
		this.context.translate( -px, -py );
		this.context.arc( x, y, r, 0, 2 * Math.PI, false );
		this.context.restore();
		this.drawShape();

		return true;
	}
	canvas.arc = function( x, y, r, arc, close, rotation )
	{
		if ( r <= 0 || !this.stroke && !this.fill ) { return false; }

		var px = x;
		var py = y;

		x = this.setRoundAlignmentX( x, r );
		y = this.setRoundAlignmentY( y, r );

		if( rotation )
		{
			this.transformShape( px, py, rotation );
			this.context.arc( x, y, r, 0, Math.clamp( ( 1/360*arc ) * ( 2 * Math.PI ), -360, 360 ), false );
			if(close) this.context.closePath();
			this.context.restore();
		}
		else
		{
			this.context.beginPath();
			this.context.arc( x, y, r, 0, Math.clamp( ( 1/360*arc ) * ( 2 * Math.PI ), -360, 360 ), false );
			if(close) this.context.closePath();
		}
		this.drawShape();
		return true;
	}
	canvas.grid = function( x, y, rotation ) // FIX THE LENGTH OF THE START AND END EDGES
	{
		if (  x <= 0 || x <= 0 || !this.stroke ) return false;

		y = y || x;

		var w = this.id.width;
		var h = this.id.height;

		if( rotation )
			this.transformShape( px, py, rotation );
		else
			this.context.beginPath();

		for(var X = 0; X < w;  X+=x)
		{
			this.context.moveTo( X, 0 );
			this.context.lineTo( X, h );
		}
		for(var Y = 0; Y < h; Y+=y)
		{
			this.context.moveTo( 0, Y );
			this.context.lineTo( w, Y );
		}

		this.context.moveTo( w, h );
		this.context.lineTo( w, 0 );
		this.context.moveTo( 0, h );
		this.context.lineTo( w, h );

		if( rotation ) this.context.restore();

		if( this.context.globalAlpha !== this.strokeAlpha ) 
			this.context.globalAlpha = this.strokeAlpha;
		this.context.stroke();
		return true;
	}
	canvas.rectBevel = function( x, y, w, h, b, rotation )
	{
		if ( !this.stroke && !this.fill ) { return false };
		
		b = Math.max(0,Math.min(w/2,b)) || 1;
		
		var px = x;
		var py = y;

		x = this.setRectAlignmentX( x, w );
		y = this.setRectAlignmentY( y, h );

		var xb = x+b;
		var yb = y+b;
		var xw = x+w;
		var yh = y+h;
		var xwb = x+w-b;
		var yhb = y+h-b;
		
		if( rotation ) this.transformShape( px, py, rotation );

		this.context.beginPath();
		this.context.moveTo(x,  yb );
		this.context.lineTo(x,  yhb);
		this.context.lineTo(xb, yh );
		this.context.lineTo(xwb,yh );
		this.context.lineTo(xw, yhb);
		this.context.lineTo(xw, yb );
		this.context.lineTo(xwb,y  );
		this.context.lineTo(xb, y  );
		this.context.closePath();

		if( rotation ) this.context.restore();
		
		this.drawShape();

		return true;
	}

	canvas.rectRound = function( x, y, w, h, r, rotation )
	{
		if ( !this.stroke && !this.fill ) { return false };
		
		r = Math.max(0,Math.min(w/2,r)) || 1;
		
		var px = x;
		var py = y;

		x = this.setRectAlignmentX( x, w );
		y = this.setRectAlignmentY( y, h );

		var xr = x+r;
		var yr = y+r;
		var xw = x+w;
		var yh = y+h;
		var xwr = x+w-r;
		var yhr = y+h-r;

		if( rotation ) this.transformShape( px, py, rotation );

		this.context.moveTo( x, yhr );
		this.context.bezierCurveTo( x,yhr,  x,yh,   xr,yh  );
		this.context.lineTo(xwr, yh );
		this.context.bezierCurveTo( xwr,yh, xw,yh,  xw,yhr );
		this.context.lineTo(xw, yr );
		this.context.bezierCurveTo( xw, yr, xw,y,   xwr,y  );
		this.context.lineTo(xr, y );
		this.context.bezierCurveTo( xr,y,   x, y,  x, yr   );
		this.context.closePath();
		
		if( rotation ) this.context.restore();

		this.drawShape();
		
		return true;
	}
	/***************************************************************************************/
	/***************************************************************************************/
	/***************************************************************************************/
	/***************************************************************************************/
	// Image Methods
	/***************************************************************************************/
	/***************************************************************************************/
	/***************************************************************************************/
	canvas.imageAlpha = 1;
	canvas.opaque = true;
	canvas.imageHorizontal = 'left';
	canvas.imageVertical = 'top';

	canvas.setImageAlpha = function( a , maxAlpha )
	{
		if(typeof a !== 'number') {
			console.log(".setImageAlpha: Not-a-Number Error, inputted value is "+a);
			return false;
		}

		maxAlpha = Math.clamp( maxAlpha, 0, 255 ) || 255;
		this.imageAlpha = Math.clamp( 1/maxAlpha*a, 0, 1 );

		if( a <= 0 || maxAlpha <= 0 ) 
			this.opaque = false;
		else 
			this.opaque = true;
		return true;
	}
	canvas.setImageAlignmentX = function( x, w )
	{
		if ( this.imageHorizontal === 'center' )
			return x = x - w/2;
		else
		if ( this.imageHorizontal === 'right' )
			return x = x - w;
		return x;
	}
	canvas.setImageAlignmentY = function( y, h )
	{
		if ( this.imageVertical === 'center' )
			return y = y - h/2;
		else
		if ( this.imageVertical === 'bottom' )
			return y = y - h;
		return y;
	}
	canvas.imageAlignment = function( horizontal, vertical )
	{
		if( horizontal === 'center' || horizontal === 'left' || horizontal === 'right' )
			this.imageHorizontal = horizontal;
		else
			console.log('imageAlignment invalid horizontal value: ' + horizontal + " (horizontal unchanged, use 'center', 'left' or 'right')");
			
		if( vertical === 'center' || vertical === 'top' || vertical === 'bottom' )
			this.imageVertical = vertical;
		else
			console.log('imageAlignment invalid vertical value: ' + vertical + " (vertical unchanged, use 'center', 'top' or 'bottom')");
	}
	canvas.deleteImage = function( cache )
	{
		cache.onload = function(){
			cache.width = 0;
			cache.height = 0;
			cache.getContext('2d').clearRect(0,0,cache.width,cache.height);
			cache = null;
		}
		cache.width = 0;
		cache.height = 0;
		cache.getContext('2d').clearRect(0,0,cache.width,cache.height);
		cache = null;

		return null;
	}
	canvas.setImageMask = function( type, x, y, a, b, c )
	{
		if(type === 'circle')
		{
			this.context.beginPath();
			this.context.arc( x || 0, y || 0, a || 50, 0, 2 * Math.PI, false );
			return true;
		}
		else 
		if(type === 'rect')
		{
			var px = x;
			var py = y;

			x = this.setImageAlignmentX( x, a );
			y = this.setImageAlignmentY( y, b );

			if(c){
				this.context.save();
				this.context.beginPath();
				this.context.translate(px, py);
				this.context.rotate(c*Math.PI/180);
				this.context.translate(-px, -py);
				this.context.rect( x, y, a || 50, b || 50 );
				this.context.restore();
			} else {
				this.context.beginPath();
				this.context.rect( x, y, a || 50, b || 50 );
			}
			return true;
		}
		else 
		if(type === 'ellipse')
		{
			this.context.beginPath();
			/////////////////////
			return true;
		}
		else 
		if(type === 'rectBevel')
		{
			this.context.beginPath();
			/////////////////////
			return true;
		}
		else 
		if(type === 'rectRound')
		{
			this.context.beginPath();
			/////////////////////
			return true;
		}
		else 
		if(type === 'shape')
		{
			this.context.beginPath();
			/////////////////////
			return true;
		}
	}
	canvas.precacheImage = function( src )
	{
		var cache = document.createElement('canvas');
		var img = new Image();
		img.src = src;
		console.log('Loading image: '+src);
		cache.loaded = false;

		img.onload = function(){
			cache.width = img.width;
			cache.height = img.height;
			cache.getContext('2d').drawImage(img, 0, 0);
			cache.loaded = true;
			console.log('Image loaded: '+src);
			img = null;
		}
		return cache;
	}
	canvas.image = function( cache, x, y, w, h, mask, rotation )
	{
		if(w <= 0 || h <= 0 || !this.opaque) { return false };

		if( this.context.globalAlpha !== this.imageAlpha ) this.context.globalAlpha = this.imageAlpha;

		if(!cache || !cache.loaded) { 
			console.log(".image(): Your image variable, '"+cache+"' has not yet loaded, failed to load or the cache is null!");
			return false;
		}

		var px = x;
		var py = y;

		w = w || cache.width;
		h = h || cache.height;
		x = this.setImageAlignmentX( x, w ) || px;
		y = this.setImageAlignmentY( y, h ) || py;
		
		if(mask || rotation){
			this.context.save();
			if(mask) this.context.clip();
			if(rotation)
			{
				this.context.translate( px, py );
				this.context.rotate( rotation*Math.PI/180 );
				this.context.translate( -px, -py );
			}
			this.context.drawImage( cache, x, y, w, h );
			this.context.restore();
		} else 
			this.context.drawImage( cache, x, y, w, h );

		return true;
	}
	canvas.saveImage = function( cache )
	{
		//var dt = this.toDataURL('image/jpeg');

	}




	/***************************************************************************************/

	canvas.collisionBox = function( x, y, w, h )
	{
		var box = {};
		box.context = this.context;
		box.shapes = this;
		box.x = x;
		box.y = y;
		box.w = w;
		box.h = h;
		box.mouseover = function()
		{
			return (
		      this.shapes.mouseX >= this.x   	  && 
		      this.shapes.mouseX <  this.x+this.w && 
		      this.shapes.mouseY >= this.y   	  && 
		      this.shapes.mouseY <  this.y+this.h );
		}
		box.mousedown = function()
		{
			return this.mouseover() && this.shapes.mousedown;
		}
		box.mouseup = function()
		{
			return this.mouseover() && !this.shapes.mousedown;
		}
		box.antiDragOnto = function()
		{
			// Prevents users from clicking outside the shape and dragging onto it.
			// if the mouse is released 
			//    then dontdrag = false;
			// OR //
			// if dont is false, the mouse is not over the sphere, and the mouse is pressed down.
			//    then dontdrag = true;
			if( !this.shapes.mousedown ) 
				this.dontDrag = false;
			else 
			if( !this.dontDrag && !this.mousedown() && this.shapes.mousedown )
				this.dontDrag = true;
		}
		box.collide = function( cBox )
		{
			return(
			  this.x + this.w > cBox.x &&
			  cBox.x + cBox.w > this.x &&
			  this.y + this.h > cBox.y &&
			  cBox.y + cBox.h > this.y );
		}
		box.push = function( cBox, ctype )
		{
			if( this.collide( cBox ) )
			{
				var w2 = this.w/2;
				var h2 = this.h/2;
				var top = cBox.y + cBox.h < this.y + h2;
		        var lef = cBox.x + cBox.w < this.x + w2;
		        var rig = this.x + w2 <= cBox.x;
		        var bot = this.y + h2 <= cBox.y;

		        // FIX THE JUMP UP AND DOWN ISSUE

		        ctype = ctype.toLowerCase();
		        if( ctype == 'top' && top) this.pushAbove( cBox );
		        else
		        if( ctype == 'bottom' && bot) this.pushBelow( cBox );
		    	else
		        if( ctype == 'left' && lef) this.pushLeft( cBox );
		   	 	else
		        if( ctype == 'right' && rig) this.pushRight( cBox );
		    	else
		    	if( ctype == 'verticaltube') 
		    	{
		    		 if(lef) this.pushLeft(  cBox );
				else if(rig) this.pushRight( cBox );
		    	}
		    	else
		    	if( ctype == 'horizontaltube') 
		    	{
		    		 if(top) this.pushAbove( cBox );
				else if(bot) this.pushBelow( cBox );
		    	}
		    	else
		    	if( ctype == 'bottomleft') 
		    	{
		    		 if(bot) this.pushBelow( cBox );
				else if(lef) this.pushLeft( cBox  );
		    	}
		    	else
		    	if( ctype == 'bottomlight') 
		    	{
		    		 if(bot) this.pushBelow( cBox );
				else if(rig) this.pushRight( cBox );
		    	}
		    	else
		    	if( ctype == 'topleft') 
		    	{
		    		 if(top) this.pushAbove( cBox );
				else if(lef) this.pushLeft( cBox  );
		    	}
		    	else
		    	if( ctype == 'topright') 
		    	{
		    		 if(top) this.pushAbove( cBox );
				else if(rig) this.pushRight( cBox );
		    	}
		    	else
		    	if( ctype == 'tubecaptop') 
		    	{
		    		 if(top) this.pushAbove( cBox );
				else if(lef) this.pushLeft( cBox  );
				else if(rig) this.pushRight( cBox );
		    	}
		    	else
		    	if( ctype == 'tubecapbottom') 
		    	{
		    		 if(bot) this.pushBelow( cBox );
				else if(lef) this.pushLeft( cBox  );
				else if(rig) this.pushRight( cBox );
		    	}
		    	else
		    	if( ctype == 'tubecapleft') 
		    	{
		    		 if(lef) this.pushLeft( cBox  );
				else if(top) this.pushAbove( cBox );
				else if(bot) this.pushBelow( cBox );
		    	}
		    	else
		    	if( ctype == 'tubecapright') 
		    	{
		    		 if(rig) this.pushRight( cBox  );
				else if(top) this.pushAbove( cBox );
				else if(bot) this.pushBelow( cBox );
		    	}
		    	else
		        {
		        	 if(top) this.pushAbove( cBox );
				else if(bot) this.pushBelow( cBox );
				else if(lef) this.pushLeft(  cBox );
				else if(rig) this.pushRight( cBox );
		        }
			}
		}
		box.pushAbove = function( cBox )
		{
			cBox.y  = this.y - cBox.h;
		}
		box.pushBelow = function( cBox )
		{
			cBox.y  = this.y + this.h;
		}
		box.pushLeft = function( cBox )
		{
			cBox.x  = this.x - cBox.w;
		}
		box.pushRight = function( cBox )
		{
			cBox.x  = this.x + this.w;
		}
		box.mousedrag = function()
		{
			// *xyToCenter - true = drag the circle by its center; false/undefined = drag by relative
			this.antiDragOnto(); // Checks if user is dragging onto the shape

			// if the mouse is released 
			//    then dragging = false;
			// OR //
			// if dont is true  // OR // you are not dragging onto it, and the mouse is pressed down inside the shape.
			//    then dragging = true;
			if( !this.shapes.mousedown )
			{
				this.dragged = false;
				return false;
			}
			else if( this.dragged || !this.dontDrag && this.mousedown() )
			{
				this.x = this.shapes.mouseX;
				this.y = this.shapes.mouseY;
				this.dragged = true;
				return true;
			}
			return false;
		}
		box.shoot = function( dist, angle ) 
		{
			angle = angle * ( Math.PI/180 ); //formula used to turn angles into radians
			this.px = this.x; // records previous position of the point, used for getShotAngle()
			this.py = this.y;
			this.x += dist * Math.cos( angle );
			this.y += dist * Math.sin( angle );
		}
		box.offScreen = function()
		{
			//this.shapes.id.height
			return !(
		      this.x + this.r > 0 &&
			  this.shapes.id.width > this.x &&
			  this.y + this.r > 0 &&
			  this.shapes.id.height > this.y );
		}
		box.draw = function()
		{
			this.context.beginPath();
			this.context.rect( this.x, this.y, this.w , this.h );
			this.context.fill();
		}
		return box;
	}

	canvas.collisionCircle = function( x, y, r )
	{
		var circ = {};
		circ.context = this.context;
		circ.shapes = this;
		circ.x = x;
		circ.y = y;
		circ.r = r;
		circ.mouseover = function()
		{
			var x = this.shapes.mouseX - this.x;
	    	var y = this.shapes.mouseY - this.y;

	    	return Math.sqrt( x*x + y*y ) < this.r;
		}
		circ.mousedown = function()
		{
			return this.mouseover() && this.shapes.mousedown;
		}
		circ.mouseup = function()
		{
			return this.mouseover() && !this.shapes.mousedown;
		}
		circ.antiDragOnto = function()
		{
			// Prevents users from clicking outside the shape and dragging onto it.
			// if the mouse is released 
			//    then dontdrag = false;
			// OR //
			// if dont is false, the mouse is not over the sphere, and the mouse is pressed down.
			//    then dontdrag = true;
			if( !this.shapes.mousedown ) 
				this.dontDrag = false;
			else 
			if( !this.dontDrag && !this.mousedown() && this.shapes.mousedown )
				this.dontDrag = true;
		}
		circ.mousedrag = function()
		{
			// *xyToCenter - true = drag the circle by its center; false/undefined = drag by relative
			this.antiDragOnto(); // Checks if user is dragging onto the shape

			// if the mouse is released 
			//    then dragging = false;
			// OR //
			// if dont is true  // OR // you are not dragging onto it, and the mouse is pressed down inside the shape.
			//    then dragging = true;
			if( !this.shapes.mousedown )
			{
				this.dragged = false;
				return false;
			}
			else if( this.dragged || !this.dontDrag && this.mousedown() )
			{
				this.x = this.shapes.mouseX;
				this.y = this.shapes.mouseY;
				this.dragged = true;
				return true;
			}
			return false;
		}
		circ.collide = function( bcir )
		{
			var x = this.x - bcir.x;
		    var y = this.y - bcir.y;
		  
		    return Math.sqrt( x*x + y*y ) < this.r + bcir.r;
		}
		circ.push = function( bcir )
		{
			if( this.collide( bcir ) )
			{
				var dist = this.distFromCircle( bcir );
				var ang = this.getAngle( bcir );
				bcir.shoot( dist, ang );
			}
		}
		circ.getAngle = function( bcir )
		{
			var ang = Math.atan2(this.y-bcir.y, this.x-bcir.x) * ( 180 / Math.PI );
			if( ang > 360) ang -= 360;
			else
			if( ang < 0) ang += 360;
			return ang;
		}
		circ.getShotAngle = function()
		{
			var ang = Math.atan2(this.y-this.py, this.x-this.px) * ( 180 / Math.PI );
			if( ang > 360) ang -= 360;
			else
			if( ang < 0) ang += 360;
			return ang;
		}
		circ.shoot = function( dist, angle ) 
		{
			angle = angle * ( Math.PI/180 ); //formula used to turn angles into radians
			this.px = this.x; // records previous position of the point, used for getShotAngle()
			this.py = this.y;
			this.x += dist * Math.cos( angle );
			this.y += dist * Math.sin( angle );
		}
		circ.shootGravity = function( speed, angle, gravity, time )
		{
			this.time = this.time || 0;
			this.time += time;
			angle = angle * Math.PI / 180;
			this.x = this.x + ( speed * Math.sin( angle ) ) * this.time;      
			this.y = this.y + ( speed * Math.cos( angle ) + gravity * this.time ) * this.time;
		}
		circ.setOrbitAngle = function( startAngle )
		{
			this.startAngle = startAngle;
		}
		circ.orbit = function( x, y, dist, speed )
		{
			this.x = x;
			this.y = y;
			this.speed = this.speed || 1;
			this.startAngle = this.startAngle + speed || 0;

			if( this.startAngle > 360)
				this.startAngle -= 360;
			else
			if( this.startAngle < 0)
				this.startAngle += 360;

			this.shoot( dist, this.startAngle );
		}
		circ.distFromMouse = function()
		{
			var x = this.x - this.shapes.mouseX;
		    var y = this.y - this.shapes.mouseY;
			return Math.sqrt( x*x + y*y );
		}
		circ.distFromCircle = function( bcir )
		{
			var x = this.x - bcir.x;
		    var y = this.y - bcir.y;
		  
		    return Math.sqrt( x*x + y*y ) - ( this.r + bcir.r );
		}
		circ.offScreen = function()
		{
			return !(
		      this.x + this.r > 0 						&&
			  this.shapes.id.width + this.r > this.x 	&&
			  this.y + this.r > 0 						&&
			  this.shapes.id.height + this.r > this.y 	);
		}
		circ.draw = function()
		{
			this.context.beginPath();
			this.context.arc( this.x, this.y, this.r, 0, 2 * Math.PI, false );
			this.context.fill();
		}
		return circ;
	}
	canvas.key = [];
	canvas.setKeyDownListener = function(evt)
	{
		canvas.key[evt.keyCode] = true;
		canvas.key[String.fromCharCode(evt.keyCode)] = true;
	}
	document.addEventListener('keydown', canvas.setKeyDownListener, false);

	canvas.setKeyUpListener = function(evt)
	{
		canvas.key[evt.keyCode] = false;
		canvas.key[String.fromCharCode(evt.keyCode)] = false;
	}
	document.addEventListener('keyup', canvas.setKeyUpListener, false);
	/***************************************************************************************/

	Math.clamp = function( n, min, max ){
		return Math.max( min, Math.min( n , max ) );
	}
	return canvas;
}


/*
if(type == "sideTop"    && top) TOP();
        else if(type == "sideLeft"   && lef) LEFT();
        else if(type == "sideRight"  && rig) RIGHT();
        else if(type == "sideBottom" && bot) BOTTOM();
        else if(type == "tubeVertical")
        {
               if(lef) LEFT();
          else if(rig) RIGHT();
        } 
        else if(type == "tubeHorizontal")
        {
               if(top) TOP();
          else if(bot) BOTTOM();
        }
        else if(type == "cornerBL")
        {
               if(bot) BOTTOM();
          else if(lef) LEFT();
        }
        else if(type == "cornerBR")
        {
               if(bot) BOTTOM();
          else if(rig) RIGHT();
        }
        else if(type == "cornerTL")
        {
               if(top) TOP();
          else if(lef) LEFT();
        }
        else if(type == "cornerTR")
        {
               if(top) TOP();
          else if(rig) RIGHT();
        }
        else if(type == "tubeCapTop")
        {
               if(top) TOP();
          else if(lef) LEFT();
          else if(rig) RIGHT();
        }
        else if(type == "tubeCapBottom")
        {
               if(bot) BOTTOM();
          else if(lef) LEFT();
          else if(rig) RIGHT();
        }
        else if(type == "tubeCapRight")
        {
               if(rig) RIGHT();
          else if(top) TOP();
          else if(bot) BOTTOM();
        }
        else if(type == "tubeCapLeft")
        {
               if(lef) LEFT();
          else if(top) TOP();
          else if(bot) BOTTOM();
        }
        else if(type == "single")
        {
               if(top) TOP();
          else if(bot) BOTTOM();
          else if(lef) LEFT();
          else if(rig) RIGHT();
        }
        else {  }
*/