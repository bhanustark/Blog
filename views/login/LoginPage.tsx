const LoginPage = () => {
    return (
        <div class="min-h-screen bg-base-200 flex items-center">
            <div class="card mx-auto w-full max-w-5xl  shadow-xl">
                <div class="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                    <div class=''>
                        <div class="hero min-h-full rounded-l-xl bg-base-200">
                            <div class="hero-content py-12">
                                <div class="max-w-md">

                                    <h1 class='text-3xl font-bold '>Welcome back!</h1>

                                    {/* Importing pointers component */}
                                    <h2 class="text-2xl mt-8 font-bold">Login to your account</h2>
                                    <p class="py-2 mt-4">✓ <span class="font-semibold">Add/update/delete</span> posts and categories.</p>
                                    <p class="py-2 ">✓ <span class="font-semibold">Analyse</span> your posts views, user sources etc.</p>
                                    <p class="py-2">✓ <span class="font-semibold">Update</span> your profile and settings.</p>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class='py-24 px-10'>
                        <h2 class='text-2xl font-semibold mb-2 text-center'>Login</h2>
                        <form>

                            <div class="mb-4">
                                <div class="form-control w-full mt-4">
                                    <label class="label">
                                        <span class="label-text text-base-content ">Email Id</span>
                                    </label>
                                    <input type="email" placeholder="Email Id" class="input  input-bordered w-full" />
                                </div>
                                <div class="form-control w-full mt-4">
                                    <label class="label">
                                        <span class="label-text text-base-content ">Email Id</span>
                                    </label>
                                    <input type="email" placeholder="Email Id" class="input  input-bordered w-full" />
                                </div>

                            </div>

                            <div class='text-right text-primary'><a href="/forgot-password"><span class="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Forgot Password?</span></a>
                            </div>
                            <button type="submit" class={"btn mt-2 w-full btn-primary"}>Login</button>

                            <div class='text-center mt-4'>Don't have an account yet? <a href="/register"><span class="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Register</span></a></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage