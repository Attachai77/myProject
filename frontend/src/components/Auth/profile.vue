<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="well profile">
                        <div class="col-sm-12">
                            <img :src="profile.img_path" alt="" style="width:200px" class="img-circle img-responsive">
                            <h2>{{ profile.firstname +" "+ profile.lastname }}</h2>
                            <p><strong>Email: </strong> {{ profile.email }} </p>
                            <p><strong>Birthdate: </strong> {{ profile.birthdate }} </p>
                            <p><strong>Skills: </strong>
                                <span class="tags">{{profile.username}}</span> 
                            </p>    
                        </div>  
                    </div>                 
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from "../../http-common";

export default {
    data() {
        return {
            profile:{}
        }
    },
    methods: {
        async getAuthData(){
            let auth = JSON.parse(localStorage.getItem('user'))
            try {
                const profile = await this.$store.dispatch('users/getUserById',auth.id)
                this.profile = profile
            } catch (error) {
                if (error.response.status == 401) {
                    this.$message({
                        message: error.response.data.message,
                        type: 'error',
                        position: 'top-right',
                    })
                    this.$parent.logout();
                }
            }
            return
        }
    },
    created() {
        
    },
    async mounted() {
        await this.getAuthData();
        if (!this.profile.img_path) {
            this.profile.img_path = "https://www.w3schools.com/howto/img_avatar.png"
        }
    },
    beforeDestroy() {

    },
}
</script>

<style>
    .profile 
{
    min-height: 355px;
    display: inline-block;
    }
.img-circle{
    border-radius: 50%;
}
figcaption.ratings
{
    margin-top:20px;
    }
figcaption.ratings a
{
    color:#f1c40f;
    font-size:11px;
    }
figcaption.ratings a:hover
{
    color:#f39c12;
    text-decoration:none;
    }
.divider 
{
    border-top:1px solid rgba(0,0,0,0.1);
    }
.emphasis 
{
    border-top: 4px solid transparent;
    }
.emphasis:hover 
{
    border-top: 4px solid #1abc9c;
    }
.emphasis h2
{
    margin-bottom:0;
    }
span.tags 
{
    background: #1abc9c;
    border-radius: 2px;
    color: #f5f5f5;
    font-weight: bold;
    padding: 2px 4px;
    }
.dropdown-menu 
{
    background-color: #34495e;    
    box-shadow: none;
    -webkit-box-shadow: none;
    width: 250px;
    margin-left: -125px;
    left: 50%;
    }
.dropdown-menu .divider 
{
    background:none;    
    }
.dropdown-menu>li>a
{
    color:#f5f5f5;
    }
.dropup .dropdown-menu 
{
    margin-bottom:10px;
    }
.dropup .dropdown-menu:before 
{
    content: "";
    border-top: 10px solid #34495e;
    border-right: 10px solid transparent;
    border-left: 10px solid transparent;
    position: absolute;
    bottom: -10px;
    left: 50%;
    margin-left: -10px;
    z-index: 10;
    }
</style>