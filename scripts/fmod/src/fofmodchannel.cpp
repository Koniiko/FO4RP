#ifndef __FOFMOD_CHANNEL__
#define __FOFMOD_CHANNEL__

// TODO
#include "fofmodchannel.h"
#include "stddef.h"

#include "_defines.fos"
#include "fonline.h"

namespace FOFMOD
{
	Channel::Channel()
	{
		this->refcount = 0;
		this->handle = NULL;
	}

	Channel::~Channel()
	{
		if( this->handle )
		{

		}
	}

	void Channel::Addref()
	{
		#if defined ( FO_GCC )
		INTERLOCKED_INCREMENT (&this->refcount, 1);
		#else
		INTERLOCKED_INCREMENT (&this->refcount );
		#endif
	}

	void Channel::Release()
	{
		if(!
		#if defined ( FO_GCC ) 
		INTERLOCKED_DECREMENT ( &this->refcount, 1 )
		#else
		INTERLOCKED_DECREMENT ( &this->refcount )
		#endif
		)
		{
			FOFMOD_DEBUG_LOG(" Deleting channel %d at refcount %d \n ", this->handle, this->refcount );
			delete this;
		}
	}

	void Channel::SetPlaybackPosition( unsigned int positionMs )
	{
		if( this->handle )
		{
			this->handle->setPosition( positionMs, FMOD_TIMEUNIT_MS );
		}
	}

	void Channel::GetPlaybackPosition( unsigned int* value )
	{
		if( this->handle )
		{
			this->handle->getPosition( value, FMOD_TIMEUNIT_MS );
		}
	}

	// TODO
	void Channel::GetSound( FOFMOD::Sound** value )
	{
		if( this->handle )
		{
			
		}
	}

	void Channel::GetPitch( float* value )
	{
		if( this->handle )
		{
			this->handle->getPitch( value );
		}
	}

	void Channel::SetPitch(float pitch)
	{
		if( this->handle )
		{
			this->handle->setPitch( pitch );
		}
	}

	void Channel::IsValid( bool* value )
	{
		// fmod docs say the handle will be invalidated by the system when its done, but it does not define what is "invalidation", assuming NULL;
		*value = ( this->handle != NULL ); 
	}


	void Channel::SetPaused( bool paused )
	{
		if( this->handle )
		{
			this->handle->setPaused( paused );
		}
	}

	void Channel::IsPaused( bool* value )
	{
		if( this->handle )
		{
			this->handle->getPaused( value );
		}
	}

	void Channel::Stop()
	{
		if( this->handle )
		{
			this->handle->stop();
		//	this->handle = NULL;   // making sure ? 
		}
	}


	void Channel::IsPlaying( bool* value )
	{
		if( this->handle )
		{
			this->handle->isPlaying( value );
		}
	}

	void Channel::SetVolume( float volume )
	{
		if( this->handle )
		{
			this->handle->setVolume( volume );
		}
	}

	void Channel::GetVolume( float* value )
	{
		if( this->handle )
		{
			this->handle->getVolume( value );
		}
	}


	void Channel::Set3DPosition( float x, float y, float z )
	{
		if( this->handle )
		{
			FMOD_VECTOR vec = {x, y, z};
			this->handle->set3DAttributes( &vec , NULL );
		}
	}

	void Channel::Set3DVelocity( float x, float y, float z )
	{
		if( this->handle )
		{
			FMOD_VECTOR vec = {x, y, z};
			this->handle->set3DAttributes( NULL, &vec );
		}
	}



	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	void Script_Channel_Addref( FOFMOD::Channel* ptr )
	{
		if( ptr )
		{
			ptr->Addref();
		}
	}

	void Script_Channel_Release( FOFMOD::Channel* ptr )
	{
		if( ptr )
		{
			ptr->Release();
		}
	}


	void Script_Channel_SetPlaybackPosition( unsigned int positionMs, FOFMOD::Channel* ptr)
	{
		if( ptr )
		{
			ptr->SetPlaybackPosition( positionMs );
		}
		
	}

	unsigned int Script_Channel_GetPlaybackPosition( FOFMOD::Channel* ptr )
	{
		unsigned int result = 0;
		if( ptr )
		{
			ptr->GetPlaybackPosition( &result );
		}
		return result;
	}

	FOFMOD::Sound* Script_Channel_GetSound( FOFMOD::Channel* ptr )
	{
		FOFMOD::Sound* result = NULL;
		if( ptr )
		{
			ptr->GetSound( &result );
		}
		return result;
	}

	float Script_Channel_GetPitch( FOFMOD::Channel* ptr )
	{
		float result = 0.0;
		if( ptr )
		{
			ptr->GetPitch( &result );
		}
		return result;
	}

	void Script_Channel_SetPitch( float pitch, FOFMOD::Channel* ptr )
	{
		if( ptr )
		{
			ptr->SetPitch( pitch );
		}
	}

	bool Script_Channel_IsValid( FOFMOD::Channel* ptr )
	{
		bool result = false;
		if( ptr )
		{
			ptr->IsValid( &result );
		}
		return result;
	}


	void Script_Channel_SetPaused( bool paused, FOFMOD::Channel* ptr  )
	{	
		if( ptr )
		{
			ptr->SetPaused( paused );
		}
	}

	bool Script_Channel_IsPaused( FOFMOD::Channel* ptr )
	{
		bool result = false;
		if( ptr )
		{
			ptr->IsPaused( &result );
		}
		return result;
	}

	void Script_Channel_Stop(FOFMOD::Channel* ptr  )
	{
		if( ptr )
		{
			ptr->Stop();
		}
	}

	bool Script_Channel_IsPlaying( FOFMOD::Channel* ptr )
	{
		bool result = false;
		if( ptr )
		{
			ptr->IsPlaying( &result );
		}
		return result;
	}

	void Script_Channel_SetVolume( float volume, FOFMOD::Channel* ptr )
	{
		if( ptr )
		{
			ptr->SetVolume( volume );
		}
	}

	float Script_Channel_GetVolume( FOFMOD::Channel* ptr )
	{
		float result = 0.0;
		if( ptr )
		{
			ptr->GetVolume( &result );
		}
		return result;
	}

	void Script_Channel_Set3DPosition( float x, float y, float z, FOFMOD::Channel* ptr )
	{
		if( ptr )
		{
			ptr->Set3DPosition( x, y, z );
		}
	}

	void Script_Channel_Set3DVelocity( float x, float y, float z, FOFMOD::Channel* ptr )
	{
		if( ptr )
		{
			ptr->Set3DVelocity( x, y, z );
		}
	}
}

#endif // __FOFMOD_CHANNEL__